import * as assert from 'assert';

import parseArgs from '../src/args';

assert.deepStrictEqual(parseArgs(['$0', '$1', 'a', 'b']), {
    layoutPaths: [],
    filePaths: ['a', 'b'],
    stdin: false,
});

assert.deepStrictEqual(parseArgs(['$0', '$1', '--', 'a', 'b']), {
    layoutPaths: [],
    filePaths: ['a', 'b'],
    stdin: false,
});

assert.deepStrictEqual(parseArgs(['$0', '$1', 'a', 'b', '--', 'c', 'd']), {
    layoutPaths: ['a', 'b'],
    filePaths: ['c', 'd'],
    stdin: false,
});

assert.deepStrictEqual(parseArgs(['$0', '$1', '-']), {
    layoutPaths: [],
    filePaths: [],
    stdin: true,
});

assert.deepStrictEqual(parseArgs(['$0', '$1', 'a', 'b', '-', '--', 'c', 'd']), {
    layoutPaths: ['a', 'b', '-'],
    filePaths: ['c', 'd'],
    stdin: false,
});

assert.deepStrictEqual(parseArgs(['$0', '$1', 'a', 'b', '--', 'c', 'd', '-']), {
    layoutPaths: ['a', 'b'],
    filePaths: ['c', 'd'],
    stdin: true,
});

assert.strictEqual(typeof parseArgs(['$0', '$1', '-h']), 'string');
assert.strictEqual(typeof parseArgs(['$0', '$1', '-H']), 'string');
assert.strictEqual(typeof parseArgs(['$0', '$1', '--help']), 'string');

assert.deepStrictEqual(parseArgs(['$0', '$1', 'not--help']), {
    layoutPaths: [],
    filePaths: ['not--help'],
    stdin: false,
});
