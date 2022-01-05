interface Diff<T = any> {
    type: 'ADD' | 'REMOVE' | 'CHANGE';
    path: (string | number)[];
    old?: T;
    new?: T;
}

const diff = <T = any, TObj = Record<string, T>>(oldObj: TObj, newObj: TObj) => {
    const result: Diff[] = [];

    const _diff = (oldObj: TObj, newObj: TObj, parent: (string | number)[]) => {
        for (const key in newObj) {
            if (!(key in oldObj)) {
                result.push({
                    type: 'ADD',
                    path: parent.concat(key),
                    new: newObj[key]
                });
            }
        }
        for (const key in oldObj) {
            const oldV = oldObj[key];
            const path = parent.concat(key);
            if (!(key in newObj)) {
                result.push({
                    type: 'REMOVE',
                    path,
                    old: oldV
                });
                continue;
            }
            const newV = newObj[key];
            if (typeof oldV !== 'object') {
                if (oldV !== newV) {
                    result.push({
                        type: 'CHANGE',
                        path,
                        old: oldV,
                        new: newV
                    });
                }
                continue;
            }
            _diff(oldV as unknown as TObj, newV as unknown as TObj, path);
        }
    };

    _diff(oldObj, newObj, []);

    return result;
};

export default diff;
