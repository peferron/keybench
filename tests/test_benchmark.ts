import * as fs from 'fs';
import * as assert from 'assert';
import * as stream from 'stream';

import benchmark from '../src/benchmark';
import rethrow from '../src/async';

const EXPECTED = [{
    layout: 'Test layout',
    knownCharacterCount: 3856,
    knownCharacterKeystrokes: 4236,
    keystrokesPerCharacter: 4236 / 3856,
    unknownCharacterCount: 51,
    unknownCharacterSet: new Set(['j', 'w', 'O']),
}];

rethrow(async () => {
    const layoutPaths = ['tests/inputs/layout.json'];
    const filePaths = ['tests/inputs/sample1.txt', 'tests/inputs/sample2.txt'];

    assert.deepStrictEqual(await benchmark(layoutPaths, filePaths), EXPECTED);
});

rethrow(async () => {
    const layoutPaths = ['tests/inputs/layout.json'];
    const filePaths = ['tests/inputs/sample1.txt'];

    const stdin: stream.Readable = process.stdin as any;
    stdin.push(fs.readFileSync('tests/inputs/sample2.txt', 'utf8'));
    stdin.emit('end');

    assert.deepStrictEqual(await benchmark(layoutPaths, filePaths, {stdin: true}), EXPECTED);
});
