import {exec} from 'child_process';
import * as assert from 'assert';

const command = 'ts-node src/keybench.ts tests/inputs/layout.json tests/inputs/sample.ts';

exec(command, (err, stdout, stderr) => {
    assert.strictEqual(err, null);
    assert.strictEqual(stdout, '{ characters: 1023, keystrokes: 1180 }\n');
    assert.strictEqual(stderr, '');
});
