import * as fs from 'fs';

import {Args} from './args';
import parseLayout from './layout';
import parseStreams from './text';
import crunchStats, {Stats} from './stats';

export default async function benchmark(args: Args): Promise<Stats[]> {
    const layouts = args.layoutPaths.map(path =>
        parseLayout(fs.readFileSync(path, {encoding: 'utf8'}))
    );

    const text = await parseStreams(...args.filePaths.map(path =>
        fs.createReadStream(path, {encoding: 'utf8'})
    ));

    return layouts.map(layout => crunchStats(layout, text));
}
