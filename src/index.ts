import parseArgs from './args';
import benchmark from './benchmark';

const args = parseArgs();
const stats = benchmark(args);
console.log(JSON.stringify(stats, null, '  '));
