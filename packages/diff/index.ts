export interface Diff<T = any> {
    type: 'ADD' | 'REMOVE' | 'CHANGE';
    path: (string | number)[];
    old?: T;
    new?: T;
}

const needDig = (obj: any) => {
    if (obj !== null && typeof obj === 'object') {
        const cname = Object.getPrototypeOf(obj).constructor.name;
        if (cname === 'Object' || cname === 'Array') return cname;
    }
};

const diff = <T = any, TObj = Record<string, T> | T[]>(oldObj: TObj, newObj: TObj) => {
    const result: Diff[] = [];
    const _diff = (oldObj: TObj, newObj: TObj, isArray: boolean) => {
        if (isArray) {
            const oldL = (oldObj as unknown as any[]).length,
                newL = (newObj as unknown as any[]).length;
            for (let i = oldL; i < newL; i++) {
                result.push({
                    type: 'ADD',
                    path: [i],
                    new: newObj[i]
                });
            }
        } else {
            for (const key in newObj) {
                if (!(key in (oldObj as any))) {
                    result.push({
                        type: 'ADD',
                        path: [key],
                        new: newObj[key]
                    });
                }
            }
        }

        for (let key in oldObj) {
            isArray && ((key as string | number) = +key);
            const oldV = oldObj[key];
            const path = [key];
            if (!(key in (newObj as any))) {
                result.push({
                    type: 'REMOVE',
                    path,
                    old: oldV
                });
                continue;
            }
            const newV = newObj[key];
            const t = needDig(oldV);
            if (!t || t !== needDig(newV)) {
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
            let i = result.length;
            _diff(oldV as unknown as TObj, newV as unknown as TObj, t === 'Array');
            const j = result.length;
            for (; i < j; i++) {
                result[i].path.unshift(key);
            }
        }
    };

    _diff(oldObj == null ? ({} as TObj) : oldObj, newObj == null ? ({} as TObj) : newObj, Array.isArray(oldObj));
    return result;
};

export default diff;
