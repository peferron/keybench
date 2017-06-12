#!/usr/bin/env node

import * as process from 'process';
import * as path from 'path';

import {compare, describe} from './stats';
import parseArgs from './args';
import benchmark from './benchmark';
import builtInLayoutPaths from './builtin';
import rethrow from './async';

const dedupPaths = (paths: string[]) => [...new Set(paths.map(p => path.resolve(p)))];

async function main() {
    const args = parseArgs(process.argv);

    if (typeof args === 'string') {
        console.log(args);
        (process as NodeJS.Process).exitCode = 2;
        return;
    }

    const stats = await benchmark(
        dedupPaths([...builtInLayoutPaths(), ...args.layoutPaths]),
        dedupPaths(args.filePaths),
        {stdin: args.stdin}
    );

    const rankedDescriptions = stats.sort(compare).map((s, i) => `${i + 1}) ${describe(s)}`);
    const output = rankedDescriptions.join('\n\n');
    console.log(output);
}

rethrow(main);
