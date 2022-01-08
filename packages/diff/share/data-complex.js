const generateObject = (count, depth) => {
    const obj = {};
    for (let i = 0; i < count; i++) {
        obj[`key-${i}`] = depth ? generateObject(count, depth - 1) : Math.random();
    }
    return obj;
};

export const oldDeepBigObj = generateObject(10, 3);

export const newDeepBigObj = JSON.parse(JSON.stringify(oldDeepBigObj));
const dig = (oldObj, newObj) => {
    for (const key in oldObj) {
        const v = oldObj[key];
        if (typeof v === 'object') {
            dig(v, v);
        } else {
            if (Math.random() > 0.8) {
                newObj[key] = Math.random();
            }
        }
    }
};

dig(oldDeepBigObj, newDeepBigObj, []);

export const oldBigObj = generateObject(500, 0);

export const newBigObj = JSON.parse(JSON.stringify(oldDeepBigObj));
