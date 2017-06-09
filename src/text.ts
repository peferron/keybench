export default function countCharacters(text: string): Map<string, number> {
    const map = new Map<string, number>();

    for (const char of text) {
        const count = map.get(char) || 0;
        map.set(char, count + 1);
    }

    return map;
}
