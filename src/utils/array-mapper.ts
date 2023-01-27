export function notRepeatedSequence<T>(array: Array<T>): Array<T> {
    return array.reduce((acc: T[], cur: T) => {
        if (!acc.includes(cur)) {
            acc.push(cur);
        }
        return acc;
    }, [])
}
