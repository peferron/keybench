import {inspect} from 'util';

export interface CharacterInfo {
    modifiers: string[];
}

interface LayoutEntry extends CharacterInfo {
    characters: string;
}

export default function parse(json: string): Map<string, CharacterInfo> {
    const entries: LayoutEntry[] = JSON.parse(json);
    const map: Map<string, CharacterInfo> = new Map();

    for (const {characters, ...info} of entries) {
        for (const char of characters) {
            if (map.has(char)) {
                throw new Error(`Character "${char}" should be present only once per layout, but ` +
                    `is present both with ${inspect(map.get(char))} and with ${inspect(info)}.`);
            }

            map.set(char, info);
        }
    }

    return map;
}
