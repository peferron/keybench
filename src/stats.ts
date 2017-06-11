import {Layout} from './layout';
import {Text} from './text';

export interface Stats {
    layout: string;
    knownCharacterCount: number;
    knownCharacterKeystrokes: number;
    keystrokesPerCharacter: number;
    unknownCharacterCount: number;
    unknownCharacterSet: Set<string>;
}

export default function crunch(layout: Layout, text: Text): Stats {
    const stats = {
        layout: layout.name,
        knownCharacterCount: 0,
        knownCharacterKeystrokes: 0,
        unknownCharacterCount: 0,
        unknownCharacterSet: new Set(),
    };

    for (const [char, count] of text.characterCounts) {
        const info = layout.characterInfos.get(char);

        if (info) {
            stats.knownCharacterCount += count;
            stats.knownCharacterKeystrokes += count * (1 + info.modifiers.length);
        } else {
            stats.unknownCharacterCount += count;
            stats.unknownCharacterSet.add(char);
        }
    }

    return {
        ...stats,
        keystrokesPerCharacter: stats.knownCharacterKeystrokes / stats.knownCharacterCount,
    };
}

export function prettify(stats: Stats): string {
  let s = stats.layout;

  s += `\n  - ${stats.unknownCharacterCount} characters cannot be typed`;
  if (stats.unknownCharacterCount > 0) {
      s += ` (${[...stats.unknownCharacterSet].join('')})`;
  }

  s += `\n  - ${stats.knownCharacterCount} characters can be typed`;
  if (stats.knownCharacterCount > 0) {
      s += ` in ${stats.knownCharacterKeystrokes} keystrokes`;
      s += ` (avg ${stats.keystrokesPerCharacter.toFixed(3)} keystrokes per character)`;
  }

  return s;
}

const compareKeystrokesPerCharacter = (a: Stats, b: Stats) =>
    (a.keystrokesPerCharacter || Number.MAX_VALUE) - (b.keystrokesPerCharacter || Number.MAX_VALUE);

const compareUnknownCharacterCount = (a: Stats, b: Stats) =>
    a.unknownCharacterCount - b.unknownCharacterCount;

export const compare = (a: Stats, b: Stats) =>
    compareKeystrokesPerCharacter(a, b) || compareUnknownCharacterCount(a, b);
