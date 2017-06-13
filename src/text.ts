import * as stream from 'stream';

export interface Text {
    characterCounts: Map<string, number>;
}

class TextStream extends stream.Writable implements Text {
    characterCounts = new Map<string, number>();

    _write(chunk: any, _encoding: string, next: () => void): void {
        for (const char of chunk.toString()) {
            const count = this.characterCounts.get(char) || 0;
            this.characterCounts.set(char, count + 1);
        }

        next();
    }
}

export default async function parseStreams(streams: stream.Readable[]): Promise<Text> {
    const text = new TextStream();

    for (const stream of streams) {
        const end = stream === streams[streams.length - 1];
        await new Promise(resolve => stream.once('end', resolve).pipe(text, {end}));
    }

    return text;
}
