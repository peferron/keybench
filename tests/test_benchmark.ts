import * as fs from 'fs';
import * as assert from 'assert';
import * as stream from 'stream';

import {Args} from '../src/args';
import benchmark from '../src/benchmark';
import rethrow from '../src/async';

rethrow(async () => {
    const args: Args =  {
        layoutPaths: ['tests/inputs/layout.json'],
        filePaths: ['tests/inputs/sample1.txt', 'tests/inputs/sample2.txt'],
        stdin: false
    };

    assert.deepStrictEqual(await benchmark(args), [{
        layout: 'Test layout',
        characters: 3907,
        keystrokes: 4289,
    }]);
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

    assert.deepStrictEqual(await benchmark(args), [{
        layout: 'Test layout',
        characters: 3907,
        keystrokes: 4289,
    }]);
});
