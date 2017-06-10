import * as assert from 'assert';

import {Args} from '../src/args';
import benchmark from '../src/benchmark';
import rethrow from '../src/async';

async function test() {
    const args: Args =  {
        layoutPaths: ['tests/inputs/layout.json'],
        filePaths: ['tests/inputs/sample.ts'],
        stdin: false
    };

    assert.deepStrictEqual(await benchmark(args), [{
        layout: 'Test layout',
        characters: 1023,
        keystrokes: 1180,
    }]);
}

rethrow(test);
