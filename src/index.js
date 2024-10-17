/**
 * data-password-entropy
 *
 * A Node.js package to calculate the entropy of a password, measuring its strength against brute-force attacks.
 *
 * @module data-password-entropy
 */

const passwordEntropy = (function () {
    // Character classes and their capacities
    let initialized = false;

    const CONTROL = 0
    const NUMBER = 1
    const UPPER = 2
    const LOWER = 3
    const PUNCTUATION_1 = 4
    const PUNCTUATION_2 = 5
    const OTHER = 6
    const N_CLASSES = 7

    let CHAR_CLASSES = [];
    let CLASS_CAPACITIES = [];

    function initializeData() {
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

        return { CHAR_CLASSES, CLASS_CAPACITIES };
    }

    initializeData();

    /**
     * Calculates the entropy of a given password.
     *
     * @param {string} password - The password string to evaluate.
     * @returns {number} - The calculated entropy value.
     */
    function calcEntropy(password) {
        if (!password) return 0;

        let effLen = 0; // effective length
        let usedClasses = 0; // bitmask for used classes
        const charCounts = {};
        const distances = {};
        let prev_nc; // previous character code

        let first = true;
        for (const c of password) {
            const nc = c.codePointAt(0);
            let cls = nc < 128 ? CHAR_CLASSES[nc] : OTHER;
            usedClasses |= 1 << cls;

            let incr = 1; // value to increment effective length

            if (!first) {
                // not the first character
                const d = nc - prev_nc;
                if (distances[d]) {
                    distances[d]++;
                    incr /= distances[d];
                } else {
                    distances[d] = 1;
                }
            }
            first = false;

            if (charCounts[c]) {
                charCounts[c]++;
                effLen += incr / charCounts[c];
            }
            else {
                charCounts[c] = 1;
                effLen += incr;
            }

            prev_nc = nc;
        }

        let pci = 0;
        for (let cls = 0; cls < N_CLASSES; cls++) {
            if (usedClasses & 1 << cls) {
                pci += CLASS_CAPACITIES[cls];
            }
        }

        return Math.floor(effLen * Math.log2(pci));
    }

    return calcEntropy;
})();

module.exports = {
  passwordEntropy
};
