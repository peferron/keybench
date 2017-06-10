import * as fs from 'fs';
import * as assert from 'assert';

import parseStreams from '../src/text';
import rethrow from '../src/async';

async function test() {
    const text = await parseStreams(fs.createReadStream('tests/inputs/sample.ts', 'utf8'));

    assert.strictEqual(text.characterCounts.get('>'), 9);
    assert.strictEqual(text.characterCounts.get(' '), 255);
    assert.strictEqual(text.characterCounts.get('\n'), 37);
    assert.strictEqual(text.characterCounts.get('µ'), undefined);
}

rethrow(test);
