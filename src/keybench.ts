import * as fs from 'fs';
import * as yargs from 'yargs';

import parseLayout from '../src/layout';
import countCharacters from '../src/text';
import crunchStats from '../src/stats';

const argv = yargs
    .usage('Usage: $0 layout text ...')
    .epilogue('For ready-to-use layouts, visit https://github.com/peferron/keybench.')
    .help().alias('h', 'help')
    .version().alias('v', 'version')
    .demandCommand(2)
    .argv;

const [layoutPaths, ...textPaths] = argv._;

const layout = parseLayout(fs.readFileSync(layoutPaths, 'utf8'));
const charCounts = countCharacters(fs.readFileSync(textPaths[0], 'utf8'));
const stats = crunchStats(layout, charCounts);

console.log(stats);
