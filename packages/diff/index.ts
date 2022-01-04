interface Diff<T = any> {
    type: 'ADD' | 'REMOVE' | 'CHANGE';
    path: (string | number)[];
    from?: T;
    to?: T;
}

const diff = <T>(obj1: T, obj2: Partial<T>, parent: (string | number)[] = [], result: Diff[] = []) => {
    for (const key in obj1) {
        const v1 = obj1[key];
        const path = parent.concat(key);
        if (!(key in obj2)) {
            result.push({
                type: 'REMOVE',
                path,
                from: v1
            });
            continue;
        }
        const v2 = obj2[key];
        if (typeof v1 !== 'object') {
            if (v1 !== v2) {
                result.push({
                    type: 'CHANGE',
                    path,
                    from: v1,
                    to: v2
                });
            }
            continue;
        }
        diff(v1, obj2[key] as Partial<typeof v1>, path, result);
    }
    for (const key in obj2) {
        if (!(key in obj1)) {
            result.push({
                type: 'ADD',
                path: parent.concat(key),
                to: obj2[key]
            });
        }
    }
    return result;
};

export default diff;
