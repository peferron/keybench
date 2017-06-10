import {Layout} from './layout';
import {Text} from './text';

export interface Stats {
    characters: number;
    keystrokes: number;
}

export default function crunch(layout: Layout, text: Text): Stats {
    const stats: Stats = {
        characters: 0,
        keystrokes: 0,
    };

    for (const [char, count] of text.characterCounts) {
        const info = layout.characterInfos.get(char);

        if (!info) {
            throw new Error(`Character "${char}" is present in the text, but not in the layout.`);
        }

        stats.characters += count;
        stats.keystrokes += count * (1 + info.modifiers.length);
    }

    return stats;
}
