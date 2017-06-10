import * as fs from 'fs';
import * as stream from 'stream';

export interface Text {
    characterCounts: Map<string, number>;
}

class TextStream extends stream.Writable implements Text {
    characterCounts = new Map<string, number>();

    _write(chunk: any, _encoding: string, next: Function): void {
        for (const char of chunk.toString()) {
            const count = this.characterCounts.get(char) || 0;
            this.characterCounts.set(char, count + 1);
        }

        next();
    }
}

export default async function parseStreams(...streams: fs.ReadStream[]): Promise<Text> {
    const text = new TextStream();

    for (const stream of streams) {
        await new Promise(resolve => stream.pipe(text).once('finish', resolve));
    }

    return text;
}
