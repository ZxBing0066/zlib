// exclude `l`, `o`
const DefaultLowerCaseChars = 'abcdefghijkmnpqrstuvwxyz';
// exclude 'I', 'O'
const DefaultUpperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
// exclude '1'
const DefaultDigits = '23456789';
// symbols
const DefaultSymbols = '-_.:!';

// sequences of '-' or '_' will change to long strokes in many fonts, that will make the password difficult to read
const isDifficultToRead = (password: string) => {
    for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1] && (password[i] === '_' || password[i] === '-')) {
            return true;
        }
    }
    return false;
};

const randomIndex = (max: number) => Math.floor(Math.random() * max);

const randomPick = (collection: string | string[]) => collection[randomIndex(collection.length)];

const shuffle = (passwordChars: string[], remainingTimes = 0) => {
    const l = passwordChars.length;
    let seed = '';
    while (seed.length < l * 2) {
        seed += (Math.random() + '').slice(2);
    }
    for (let i = 0; i < l; i += 2) {
        const randomI = +(seed[i] + seed[i + 1]) % l;
        const tmp = passwordChars[i];
        passwordChars[i] = passwordChars[randomI];
        passwordChars[randomI] = tmp;
    }
    if (remainingTimes > 0) shuffle(passwordChars, remainingTimes - 1);
};

const passwordGenerate = ({
    length: passwordLength = 16,
    symbols: Symbols,
    digits: Digits = DefaultDigits,
    lowerCaseChars: LowerCaseChars = DefaultLowerCaseChars,
    upperCaseChars: UpperCaseChars = DefaultUpperCaseChars,
    customChars: CustomChars,
    shuffleTimes = 1
}: {
    /** length of the password, pass a [min, max] as length range */
    length?: number | [number, number];
    /** custom your symbol collection */
    symbols?: string | true;
    /** custom your digit collection */
    digits?: string;
    /** custom your lowercase char collection */
    lowerCaseChars?: string;
    /** custom your uppercase char collection */
    upperCaseChars?: string;
    /** add your own char collection */
    customChars?: string;
    /** the number of do shuffle */
    shuffleTimes?: number;
} = {}) => {
    if (Array.isArray(passwordLength)) {
        const [min, max] = passwordLength;
        if (!min || !max || max < min) throw new Error(`Invalid password length: ${JSON.stringify(passwordLength)}`);
        passwordLength = min + randomIndex(max - min + 1);
    }
    if (passwordLength < 5 || passwordLength > 100) throw new Error(`Invalid passwordLength: ${passwordLength}`);

    if (Symbols === true) Symbols = DefaultSymbols;

    const passwordChars = [];
    const allCollections: string[] = [];
    [LowerCaseChars, UpperCaseChars, Digits, Symbols, CustomChars].forEach(
        collection => collection?.length && allCollections.push(collection)
    );

    if (!allCollections.length) throw new Error(`Invalid options without any char for generate password`);

    allCollections.forEach(collection => passwordChars.push(randomPick(collection)));

    const restCount = passwordLength - passwordChars.length;
    const fullCollection = allCollections.join('');
    for (let i = 0; i < restCount; i++) {
        passwordChars.push(randomPick(fullCollection));
    }

    let remainingAttempts = 5;
    do {
        shuffle(passwordChars, shuffleTimes - 1);
    } while (isDifficultToRead(passwordChars.join('')) && remainingAttempts--);

    return passwordChars.join('');
};

export default passwordGenerate;
