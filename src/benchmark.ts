import * as fs from 'fs';
import * as process from 'process';

import {Args} from './args';
import parseLayout from './layout';
import parseStreams from './text';
import crunchStats, {Stats} from './stats';

export default async function benchmark(args: Args): Promise<Stats[]> {
    const layouts = args.layoutPaths.map(path => parseLayout(fs.readFileSync(path, 'utf8')));
    const fileStreams = args.filePaths.map(path => fs.createReadStream(path, 'utf8'));

    if (args.stdin) {
        process.stdin.setEncoding('utf8');
        fileStreams.push(process.stdin as any);
    }

    const text = await parseStreams(fileStreams);
    return layouts.map(layout => crunchStats(layout, text));
}
