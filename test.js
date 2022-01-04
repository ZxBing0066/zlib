const allTypesOfValue = [
    null,
    undefined,
    true,
    1,
    NaN,
    Infinity,
    'string',
    Symbol('symbol'),
    () => {},
    {},
    [],
    /1/,
    new Date()
];

const tableToString = [];
allTypesOfValue.forEach(v => {
    tableToString.push({
        value: v,
        toStringResult: Object.prototype.toString.call(v)
    });
    console.log(Object.prototype.toString.call(v));
});
console.table(tableToString);

const tableTypeof = [];
allTypesOfValue.forEach(v => {
    tableTypeof.push({
        value: v,
        typeofResult: typeof v
    });
    console.log(typeof v);
});
console.table(tableTypeof);
