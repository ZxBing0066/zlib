export const array = new Array(50).fill(null).map((v, i) => i);

export const string = (() => {
    let s = '';
    for (let i = 0; i < 10; i++) s += i;
    const charCodeOfUpperCaseA = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) s += String.fromCharCode(charCodeOfUpperCaseA + i);
    const charCodeOfLowerCaseA = 'a'.charCodeAt(0);
    for (let i = 0; i < 26; i++) s += String.fromCharCode(charCodeOfLowerCaseA + i);
    return s;
})();

export const fixString = '123😴😄😃|⛔🎠🚓🚇ABC';

export const fixStringArray = ['1', '2', '3', '😴', '😄', '😃', '|', '⛔', '🎠', '🚓', '🚇', 'A', 'B', 'C'];
