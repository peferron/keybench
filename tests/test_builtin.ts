import * as fs from 'fs';
import * as assert from 'assert';

import builtinLayoutPaths from '../src/builtin';
import parseLayout from '../src/layout';

const paths = builtinLayoutPaths();
assert(paths.length > 0);

// Make sure that all built-in layouts can be parsed without throwing.
for (const path of paths) {
    try {
        parseLayout(fs.readFileSync(path, 'utf8'));
    } catch (e) {
        throw new Error(`Error parsing built-in layout ${path}: ${e}`);
    }
}
