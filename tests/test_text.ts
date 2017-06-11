import * as fs from 'fs';
import * as assert from 'assert';

import parseStreams from '../src/text';
import rethrow from '../src/async';

rethrow(async () => {
    const paths = ['tests/inputs/sample.ts', 'tests/inputs/sample.swift'];
    const text = await parseStreams(paths.map(path => fs.createReadStream(path, 'utf8')));

    assert.strictEqual(text.characterCounts.get('>'), 17);
    assert.strictEqual(text.characterCounts.get(' '), 831);
    assert.strictEqual(text.characterCounts.get('\n'), 111);
    assert.strictEqual(text.characterCounts.get('µ'), undefined);
});
