import * as fs from 'fs';
import * as assert from 'assert';

import parseText from '../src/text';

const contents = fs.readFileSync('tests/inputs/sample.ts', 'utf8');
const text = parseText(contents);

assert.strictEqual(text.characterCounts.get('>'), 9);
assert.strictEqual(text.characterCounts.get(' '), 255);
assert.strictEqual(text.characterCounts.get('\n'), 37);
assert.strictEqual(text.characterCounts.get('µ'), undefined);
