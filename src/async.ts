export default async function rethrow(fn: Function): Promise<void> {
    try {
        await fn();
    } catch (e) {
        setTimeout(() => { throw e; });
    }
}
