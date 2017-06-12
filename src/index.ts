import * as process from 'process';

import {compare, describe} from './stats';
import parseArgs from './args';
import benchmark from './benchmark';
import rethrow from './async';

async function main() {
    const args = parseArgs(process.argv);

    if (typeof args === 'string') {
        console.log(args);
        (process as NodeJS.Process).exitCode = 2;
        return;
    }

    const stats = await benchmark(args);
    const rankedDescriptions = stats.sort(compare).map((s, i) => `${i + 1}) ${describe(s)}`);
    const output = rankedDescriptions.join('\n\n');
    console.log(output);
}

rethrow(main);
