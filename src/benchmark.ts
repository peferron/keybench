import * as fs from 'fs';
import * as process from 'process';

import parseLayout from './layout';
import crunchStats, {Stats} from './stats';
import parseStreams from './text';

export default async function benchmark(
    layoutPaths: string[],
    filePaths: string[],
    {stdin = false} = {},
): Promise<Stats[]> {
    const layouts = layoutPaths.map(path => parseLayout(fs.readFileSync(path, 'utf8')));
    const fileStreams = filePaths.map(path => fs.createReadStream(path, 'utf8'));

    if (stdin) {
        process.stdin.setEncoding('utf8');
        fileStreams.push(process.stdin as any);
    }

    const text = await parseStreams(fileStreams);
    return layouts.map(layout => crunchStats(layout, text));
}
