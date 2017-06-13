import * as fs from 'fs';
import * as path from 'path';

export default function builtInLayoutPaths(): string[] {
    const dir = path.join(__dirname, '../layouts');
    const names = fs.readdirSync(dir);
    return names.map(name => path.join(dir, name));
}
