import * as fs from 'fs';
import * as assert from 'assert';

import countCharacters from '../src/text';

const text = fs.readFileSync('tests/inputs/sample.ts', 'utf8');
const charCounts = countCharacters(text);

assert.strictEqual(charCounts.get('>'), 9);
assert.strictEqual(charCounts.get(' '), 255);
assert.strictEqual(charCounts.get('\n'), 37);
assert.strictEqual(charCounts.get('µ'), undefined);
