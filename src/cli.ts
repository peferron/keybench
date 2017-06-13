#!/usr/bin/env node

import * as path from 'path';
import * as process from 'process';

import parseArgs from './args';
import rethrow from './async';
import benchmark from './benchmark';
import builtInLayoutPaths from './builtin';
import {compare, describe} from './stats';

const dedupPaths = (paths: string[]) => [...new Set(paths.map(p => path.resolve(p)))];

const println = (str: string) => process.stdout.write(str + '\n');

async function main() {
    const args = parseArgs(process.argv);

    if (typeof args === 'string') {
        println(args);
        (process as NodeJS.Process).exitCode = 2;
        return;
    }

    const stats = await benchmark(
        dedupPaths([...builtInLayoutPaths(), ...args.layoutPaths]),
        dedupPaths(args.filePaths),
        {stdin: args.stdin},
    );

    const rankedDescriptions = stats.sort(compare).map((s, i) => `${i + 1}) ${describe(s)}`);
    const output = rankedDescriptions.join('\n\n');
    println(output);
}

rethrow(main);
