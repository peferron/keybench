import * as process from 'process';

import {compare, describe} from './stats';
import parseArgs from './args';
import benchmark from './benchmark';
import builtInLayoutPaths from './builtin';
import rethrow from './async';

const dedup = <T>(array: T[]) => [...new Set(array)];

async function main() {
    const args = parseArgs(process.argv);

    if (typeof args === 'string') {
        console.log(args);
        (process as NodeJS.Process).exitCode = 2;
        return;
    }

    const stats = await benchmark(
        dedup([...builtInLayoutPaths(), ...args.layoutPaths]),
        dedup(args.filePaths),
        {stdin: args.stdin}
    );

    const rankedDescriptions = stats.sort(compare).map((s, i) => `${i + 1}) ${describe(s)}`);
    const output = rankedDescriptions.join('\n\n');
    console.log(output);
}

rethrow(main);
