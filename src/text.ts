import * as fs from 'fs';

export interface Text {
    characterCounts: Map<string, number>;
}

export default async function parseStreams(...streams: fs.ReadStream[]): Promise<Text> {
    const text: Text = {
        characterCounts: new Map()
    };

    for (const stream of streams) {
        await parseStream(stream, text);
    }

    return text;
}

async function parseStream(stream: fs.ReadStream, text: Text): Promise<void> {
    stream.on('readable', () => {
        const chars: string | null = stream.read();

        if (!chars) {
            return;
        }

        for (const char of chars) {
            const count = text.characterCounts.get(char) || 0;
            text.characterCounts.set(char, count + 1);
        }
    });

    return new Promise<void>(resolve => {
        stream.once('end', resolve);
    });
}
