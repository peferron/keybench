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
    ])
}
const stats = crunchStats(layout, text);

assert.deepStrictEqual(stats, {
    layout: 'Test layout',
    characters: 20,
    keystrokes: 33,
});
