import * as assert from 'assert';

import {Layout, CharacterInfo} from '../src/layout';
import {Text} from '../src/text';
import crunchStats from '../src/stats';

const layout: Layout = {
    name: 'Test layout',
    characterInfos: new Map<string, CharacterInfo>([
        ['a', {modifiers: []}],
        ['B', {modifiers: ['shift']}],
    ]),
};

const text: Text = {
    characterCounts: new Map<string, number>([
        ['a', 7],
        ['B', 13],
        ['c', 3],
        ['d', 2],
    ])
}
const stats = crunchStats(layout, text);

assert.deepStrictEqual(stats, {
    layout: 'Test layout',
    knownCharacterCount: 20,
    knownCharacterKeystrokes: 33,
    keystrokesPerCharacter: 33 / 20,
    unknownCharacterCount: 5,
    unknownCharacterSet: new Set(['c', 'd']),
});
