export const oldSimpleObj = {
    change: 'will be changed',
    still: 'will not change',
    remove: 'will be removed'
};
export const newSimpleObj = {
    change: 'changed',
    still: 'will not change',
    add: 'add'
};

export const oldNestedObj = {
    key: oldSimpleObj
};
export const newNestedObj = {
    key: newSimpleObj
};

export const oldDeepObj = {
    still: 'will not change',
    change: 'will be changed',
    remove: 'will be removed',
    objRemove: {
        key: 'content'
    },
    keyA: {
        keyB: {
            remove: {
                key: 'content'
            },
            keyC: {
                change: 'will be changed'
            }
        }
    }
};
export const newDeepObj = {
    still: 'will not change',
    change: 'content changed',
    newKey: 'new content',
    newObjKey: {
        key: 'content'
    },
    keyA: {
        keyB: {
            keyC: {
                newKey: {
                    key: 'content'
                },
                change: 'content changed'
            }
        }
    }
};
