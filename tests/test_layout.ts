import * as fs from 'fs';
import * as assert from 'assert';

import parseLayout from '../src/layout';

const json = fs.readFileSync('tests/inputs/layout.json', 'utf8');
const layout = parseLayout(json);

// Test layout metadata.
assert.strictEqual(layout.name, 'Test layout');

// Test characters that are missing from the layout.
assert.strictEqual(layout.characterInfos.get('µ'), undefined);

// Test modifiers.
assert.deepStrictEqual(layout.characterInfos.get('a'), {"modifiers": []});
assert.deepStrictEqual(layout.characterInfos.get('A'), {"modifiers": ['shift']});

// Test tricky characters.
assert.deepStrictEqual(layout.characterInfos.get('`'), {"modifiers": []});
assert.deepStrictEqual(layout.characterInfos.get('\\'), {"modifiers": []});
assert.deepStrictEqual(layout.characterInfos.get('\''), {"modifiers": []});
assert.deepStrictEqual(layout.characterInfos.get('"'), {"modifiers": ['shift']});
