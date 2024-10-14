/**
 * data-password-entropy
 *
 * A Node.js package to calculate the entropy of a password, measuring its strength against brute-force attacks.
 *
 * @module data-password-entropy
 */

// Character classes and their capacities
let initialized = false;

let CONTROL = 0
let NUMBER = 1
let UPPER = 2
let LOWER = 3
let PUNCTUATION_1 = 4
let PUNCTUATION_2 = 5
let OTHER = 6
let N_CLASSES = 7

let CHAR_CLASSES = [];
let CLASS_CAPACITIES = [];


function initializeConstants() {
    if (initialized) return { CHAR_CLASSES, CLASS_CAPACITIES };

    for (let i = 0; i < 128; i++) {
        let c = CONTROL;
        if (i < 32 || i == 127) {
            c = CONTROL;
        }
        else if (i >= '0'.charCodeAt(0) && i <= '9'.charCodeAt(0)) {
            c = NUMBER;
        }
        else if (i >= 'A'.charCodeAt(0) && i <= 'Z'.charCodeAt(0)) {
            c = UPPER;
        }
        else if (i >= 'a'.charCodeAt(0) && i <= 'z'.charCodeAt(0)) {
            c = LOWER;
        }
        else if (i == 32 || "!@#$%^&*()_+-=/.,".includes(String.fromCharCode(i))) {
            c = PUNCTUATION_1;
        }
        else {
            c = PUNCTUATION_2;
        }
        CHAR_CLASSES[i] = c;
        if (CLASS_CAPACITIES[c] == undefined) {
            CLASS_CAPACITIES[c] = 0;
        }
        CLASS_CAPACITIES[c] = CLASS_CAPACITIES[c] + 1;
    }
    CLASS_CAPACITIES[OTHER] = 128
    CLASS_CAPACITIES[PUNCTUATION_2] = Math.floor(CLASS_CAPACITIES[PUNCTUATION_2] * 1.8);
    initialized = true;

    // Print the constants for debug purposes
    // console.log(CHAR_CLASSES);
    // console.log(CLASS_CAPACITIES);

    return { CHAR_CLASSES, CLASS_CAPACITIES };
}

// Initialize constants once when the module is loaded
initializeConstants();

/**
 * Calculates the entropy of a given password.
 *
 * @param {string} password - The password string to evaluate.
 * @returns {number} - The calculated entropy value.
 */
function passwordEntropy(password) {
    if (!password) return 0;

    let effLen = 0.0; // effective length
    let usedClasses = 0; // bitmask for used classes
    const charCounts = {};
    const distances = {};
    let prevNc = 0; // previous character code

    let i = 0;
    for (const c of password) {
        const nc = c.codePointAt(0);
        let cls;

        if (nc > 127) {
            cls = OTHER;
        } else {
            cls = CHAR_CLASSES[nc];
        }
        usedClasses |= 1 << cls;

        let incr = 1.0; // value to increment effective length

        if (i > 0) {
            // not the first character
            const d = nc - prevNc;
            if (distances[d]) {
                distances[d] += 1;
                incr /= distances[d];
            } else {
                distances[d] = 1;
            }
        }

        if (charCounts[c]) {
            charCounts[c] += 1;
            effLen += incr / charCounts[c];
        } else {
            charCounts[c] = 1;
            effLen += incr;
        }

        prevNc = nc;
        i += 1;
    }

    let pci = 0;
    for (let cls = 0; cls < N_CLASSES; cls++) {
        if (usedClasses & 1 << cls) {
            pci += CLASS_CAPACITIES[cls];
        }
    }

    const bitsPerCharacter = Math.log2(pci);
    return Math.floor(effLen * bitsPerCharacter);
}

module.exports = {
  passwordEntropy
};
