import {inspect} from 'util';

export interface Layout {
    name: string;
    characterInfos: Map<string, CharacterInfo>;
}

export interface CharacterInfo {
    modifiers: string[];
}

interface LayoutJSON {
    name: string;
    keys: {modifiers: string[], output: string}[];
}

export default function parse(json: string): Layout {
    const {name, keys}: LayoutJSON = JSON.parse(json);
    const infos = new Map<string, CharacterInfo>();

    for (const {output, ...info} of keys) {
        for (const char of output) {
            if (infos.has(char)) {
                throw new Error(`Character "${char}" should be present only once per layout, but ` +
                    `is present with both ${inspect(infos.get(char))} and ${inspect(info)}.`);
            }

            infos.set(char, info);
        }
    }

    return {name, characterInfos: infos};
}
