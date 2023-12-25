import { Diff } from '../index';

export interface JSONPatchDiff<T = any> {
    op: 'add' | 'remove' | 'replace';
    path: string;
    value?: T;
    // Not a standard JSON Patch property, but useful for debugger diff output
    oldValue?: T;
}

export default function jsonPatchFormatter<T = any>(diffs: Diff<T>[]): JSONPatchDiff<T>[] {
    return diffs.map(diff => {
        const { type, path, old, new: newValue } = diff;
        const patchPath = '/' + path.join('/');
        switch (type) {
            case 'ADD':
                return {
                    op: 'add',
                    path: patchPath,
                    value: newValue
                };
            case 'REMOVE':
                return {
                    op: 'remove',
                    path: patchPath,
                    oldValue: old
                };
            case 'CHANGE':
                return {
                    op: 'replace',
                    path: patchPath,
                    value: newValue,
                    oldValue: old
                };
        }
    });
}
