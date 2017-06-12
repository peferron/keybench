import * as fs from 'fs';
import * as assert from 'assert';

import builtinLayoutPaths from '../src/builtin';
import parseLayout from '../src/layout';

const paths = builtinLayoutPaths();
assert(paths.length > 0);

// Make sure that all built-in layouts can be parsed without throwing.
const jsons = paths.map(path => fs.readFileSync(path, 'utf8'));
jsons.forEach(parseLayout);
