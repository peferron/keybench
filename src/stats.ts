import {CharacterInfo} from './layout';

export interface Stats {
    characters: number;
    keystrokes: number;
}

export default function crunch(
    layout: Map<string, CharacterInfo>,
    counts: Map<string, number>
): Stats {
    const stats = {
        characters: 0,
        keystrokes: 0,
    };

    for (const [char, count] of counts) {
        const info = layout.get(char);

        if (!info) {
            throw new Error(`Character "${char}" is present in the text, but not in the layout.`);
        }

        stats.characters += count;
        stats.keystrokes += count * (1 + info.modifiers.length);
    }

    return stats;
}
