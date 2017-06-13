import {inspect} from 'util';

interface LayoutJSON {
    name: string;
    keys: {modifiers: string[], output: string}[];
}

export interface Layout {
    name: string;
    characterInfos: Map<string, CharacterInfo>;
}

export interface CharacterInfo {
    modifiers: string[];
}

export default function parse(json: string): Layout {
    const {name, keys}: LayoutJSON = JSON.parse(json);
    const characterInfos = new Map<string, CharacterInfo>();

    for (const {output, ...info} of keys) {
        for (const char of output) {
            if (characterInfos.has(char)) {
                const otherInfo = characterInfos.get(char);
                throw new Error(
                    `Character "${char}" should be present only once per layout, but is present ` +
                    (info === otherInfo
                        ? `multiple times with ${inspect(info)}.`
                        : `both with ${inspect(otherInfo)} and with ${inspect(info)}.`));
            }

            characterInfos.set(char, info);
        }
    }

    return {name, characterInfos};
}
