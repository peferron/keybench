import * as fs from 'fs';
import * as assert from 'assert';

import parseLayout from '../src/layout';

const json = fs.readFileSync('tests/inputs/layout.json', 'utf8');
const layout = parseLayout(json);

// Test characters that are missing from the layout.
assert.strictEqual(layout.get('µ'), undefined);

// Test modifiers.
assert.deepStrictEqual(layout.get('a'), {"modifiers": []});
assert.deepStrictEqual(layout.get('A'), {"modifiers": ['shift']});

// Test tricky characters.
assert.deepStrictEqual(layout.get('`'), {"modifiers": []});
assert.deepStrictEqual(layout.get('\\'), {"modifiers": []});
assert.deepStrictEqual(layout.get('\''), {"modifiers": []});
assert.deepStrictEqual(layout.get('"'), {"modifiers": ['shift']});
