export default async function rethrow(fn: () => void): Promise<void> {
    try {
        await fn();
    } catch (e) {
        setTimeout(() => { throw e; }, 0);
    }
}
