export interface Text {
    characterCounts: Map<string, number>;
}

export default function parseText(text: string): Text {
    const characterCounts = new Map<string, number>();

    for (const char of text) {
        const count = characterCounts.get(char) || 0;
        characterCounts.set(char, count + 1);
    }

    return {characterCounts};
}
