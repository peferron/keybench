import * as fs from 'fs';
import * as yargs from 'yargs';

import parseLayout from '../src/layout';
import parseText from '../src/text';
import crunchStats from '../src/stats';

const argv = yargs
    .usage('Usage: $0 [layout...] [--] file...')
    .help().alias('h', 'help')
    .version()
    .demandCommand(1)
    .example(
        '$0 sample.scala sample.go',
        'Benchmark all built-in layouts against sample.scala and sample.go.\n'
    )
    .example(
        '$0 mylayout1.json mylayout2.json -- sample.scala',
        'Benchmark all built-in layouts as well as mylayout1 and mylayout2 against sample.scala.\n'
     )
    .example(
        '$0 -',
        'Benchmark all built-in layouts against stdin.'
     )
    .argv;

const [layoutPaths, ...textPaths] = argv._;

const layout = parseLayout(fs.readFileSync(layoutPaths, 'utf8'));
const text = parseText(fs.readFileSync(textPaths[0], 'utf8'));
const stats = crunchStats(layout, text);

console.log(stats);
