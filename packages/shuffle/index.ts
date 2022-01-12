const randomIndex = (l: number) => Math.floor(Math.random() * l);

function shuffle(
    target: string,
    option?: {
        // By default, string shuffle will broken with char to multiple chars, use this for fix
        fix?: true;
    }
): string;
function shuffle<T = any>(
    target: T[],
    option?: {
        // Default run as a pure function, shuffle will not affect to your origin array, you can set to false for close this
        pure?: boolean;
    }
): T[];
function shuffle<T = any>(
    target: T[] | string,
    option?: {
        fix?: boolean;
        pure?: boolean;
    }
) {
    const isString = typeof target === 'string';
    let shuffleTarget: T[] | string[];
    if (isString) {
        if (option?.fix) {
            shuffleTarget = Array.from(target);
        } else {
            shuffleTarget = target.split('');
        }
    } else {
        if (option?.pure === false) {
            shuffleTarget = target;
        } else {
            shuffleTarget = target.slice();
        }
    }

    let l = shuffleTarget.length;
    while (l) {
        let i = randomIndex(l--);
        const tmp = shuffleTarget[i];
        shuffleTarget[i] = shuffleTarget[l];
        shuffleTarget[l] = tmp;
    }

    return isString ? shuffleTarget.join('') : shuffleTarget;
}

export default shuffle;
