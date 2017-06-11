import * as process from 'process';

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
    console.log(JSON.stringify(stats, null, '  '));
}

rethrow(main);
