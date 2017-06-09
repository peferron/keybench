import * as fs from 'fs';
import * as assert from 'assert';

import parseLayout from '../src/layout';
import countCharacters from '../src/text';
import crunchStats from '../src/stats';

const layout = parseLayout(fs.readFileSync('tests/inputs/layout.json', 'utf8'));
const charCounts = countCharacters(fs.readFileSync('tests/inputs/sample.ts', 'utf8'));
const stats = crunchStats(layout, charCounts);

assert.deepStrictEqual(stats, {
    characters: 1023,
    keystrokes: 1180,
});
