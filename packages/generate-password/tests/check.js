import passwordGenerate from '../esm/index.js';

// exclude `l`, `o`
const DefaultLowerCaseChars = 'abcdefghijkmnpqrstuvwxyz';
// exclude 'I', 'O'
const DefaultUpperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
// exclude '1'
const DefaultDigits = '23456789';
// symbols
const DefaultSymbols = '-_.:!';

export const createCharCheck = chars => {
    const regex = new RegExp(`[${chars.replace('-', '\\-')}]`);
    return password => regex.test(password);
};

export const checkLowerCaseChar = createCharCheck(DefaultLowerCaseChars);
export const checkUpperCaseChar = createCharCheck(DefaultUpperCaseChars);
export const checkDigit = createCharCheck(DefaultDigits);
export const checkSymbol = createCharCheck(DefaultSymbols);

export const checkDefaultWithSymbol = (() => {
    const regex = new RegExp(
        `^[${DefaultLowerCaseChars}${DefaultUpperCaseChars}${DefaultDigits}${DefaultSymbols.replace('-', '\\-')}]{16}$`
    );
    return password =>
        password.length === 16 &&
        checkLowerCaseChar(password) &&
        checkUpperCaseChar(password) &&
        checkDigit(password) &&
        checkSymbol(password) &&
        checkReadAbility(password) &&
        regex.test(password);
})();

export const checkDefault = (() => {
    const regex = new RegExp(`^[${DefaultLowerCaseChars}${DefaultUpperCaseChars}${DefaultDigits}]{16}$`);
    return password =>
        password.length === 16 &&
        checkLowerCaseChar(password) &&
        checkUpperCaseChar(password) &&
        checkDigit(password) &&
        checkReadAbility(password) &&
        regex.test(password);
})();

export const checkReadAbility = password => !/_{2}/.test(password) || !/-{2}/.test(password);

export const multipleCheck = (check, option, count = 20) => {
    for (let i = 0; i < count; i++) {
        const password = passwordGenerate(option);
        check(password);
    }
};
