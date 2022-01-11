// exclude `l`, `o`
const DefaultLowerCaseChars = 'abcdefghijkmnpqrstuvwxyz';
// exclude 'I', 'O'
const DefaultUpperCaseChars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
// exclude '1'
const DefaultDigits = '23456789';
// symbols
const DefaultSymbols = '-_.:!';

// sequences of '-' or '_' will change to long strokes in many fonts, that will make the password difficult to read
const isDifficultToRead = (password: string) => /[_]{2}|[\-]{2}/.test(password);

const randomIndex = (max: number) => Math.floor(Math.random() * max);

const randomPick = (collection: string | string[]) => collection[randomIndex(collection.length)];

const shuffle = (passwordChars: string[], l = passwordChars.length, remainingTimes = 0) => {
    const r = passwordChars.length;
    for (let i = 0; i < l; i++) {
        const randomI = randomIndex(r);
        const tmp = passwordChars[i];
        passwordChars[i] = passwordChars[randomI];
        passwordChars[randomI] = tmp;
    }
    if (remainingTimes > 0) shuffle(passwordChars, l, remainingTimes - 1);
};

const passwordGenerate = ({
    length: passwordLength = 15,
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
        if (!min || !max || max < min || min < 5 || max > 99)
            throw new Error(`Invalid passwordLength: ${JSON.stringify(passwordLength)}`);
        passwordLength = min + randomIndex(max - min + 1);
    }
    if (passwordLength < 5 || passwordLength > 99) throw new Error(`Invalid passwordLength: ${passwordLength}`);

    if (Symbols === true) Symbols = DefaultSymbols;

    const passwordChars = [];
    const allCollections: string[] = [];
    [LowerCaseChars, UpperCaseChars, Digits, Symbols, CustomChars].forEach(
        collection => collection?.length && allCollections.push(collection)
    );
    if (!allCollections.length) throw new Error(`Invalid options without any char for generate password`);
    const al = allCollections.length;
    for (let i = 0; i < al; i++) {
        passwordChars.push(randomPick(allCollections[i]));
    }

    const restCount = passwordLength - passwordChars.length;
    const fullCollection = allCollections.join('');
    for (let i = 0; i < restCount; i++) {
        passwordChars.push(randomPick(fullCollection));
    }
    shuffle(passwordChars, al);

    if (shuffleTimes > 0) shuffle(passwordChars, passwordLength, shuffleTimes - 1);

    const needCheckReadAbility = fullCollection.indexOf('_') >= 0 || fullCollection.indexOf('-') >= 0;
    let remainingAttempts = 5;
    while (needCheckReadAbility && isDifficultToRead(passwordChars.join('')) && remainingAttempts--) {
        shuffle(passwordChars);
    }

    return passwordChars.join('');
};

export default passwordGenerate;
