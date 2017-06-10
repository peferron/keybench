export default async function async(fn: () => void): Promise<void> {
    try {
        await fn();
    } catch (e) {
        setTimeout(() => { throw e; });
    }
}
