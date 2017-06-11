import * as fs from 'fs';
import * as assert from 'assert';
import * as stream from 'stream';

import {Args} from '../src/args';
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
    const args: Args =  {
        layoutPaths: ['tests/inputs/layout.json'],
        filePaths: ['tests/inputs/sample1.txt', 'tests/inputs/sample2.txt'],
        stdin: false
    };

    assert.deepStrictEqual(await benchmark(args), EXPECTED);
});

rethrow(async () => {
    const args: Args =  {
        layoutPaths: ['tests/inputs/layout.json'],
        filePaths: ['tests/inputs/sample1.txt'],
        stdin: true
    };

    const stdin: stream.Readable = process.stdin as any;
    stdin.push(fs.readFileSync('tests/inputs/sample2.txt', 'utf8'));
    stdin.emit('end');

    assert.deepStrictEqual(await benchmark(args), EXPECTED);
});
