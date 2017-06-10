import parseArgs from './args';
import benchmark from './benchmark';
import rethrow from './async';

async function main() {
    const args = parseArgs();
    const stats = await benchmark(args);
    console.log(JSON.stringify(stats, null, '  '));
}

rethrow(main);
