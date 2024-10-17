/**
 * data-password-entropy
 *
 * A Node.js package to calculate the entropy of a password, measuring its strength against brute-force attacks.
 *
 * @module data-password-entropy
 */

const passwordEntropy = (function () {
    // Character classes and their capacities
//    const CONTROL = 0
//    const NUMBER = 1
//    const UPPER = 2
//    const LOWER = 3
//    const PUNCTUATION_1 = 4
//    const PUNCTUATION_2 = 5
//    const OTHER = 6
//    const N_CLASSES = 7

    let CHAR_CLASSES = [];
    let CLASS_CAPACITIES = [];

    for (let i = 0; i < 128; i++) {
        let c = 5;  // PUNCTUATION_2;
        if (i < 32 || i == 127) {
            c = 0; // CONTROL;
        }
//        else if (i >= '0'.charCodeAt(0) && i <= '9'.charCodeAt(0)) {
        else if (i > 47 && i < 58) {
            c = 1; // NUMBER;
        }
//        else if (i >= 'A'.charCodeAt(0) && i <= 'Z'.charCodeAt(0)) {
        else if (i > 64 && i < 91) {
            c = 2; // UPPER;
        }
//        else if (i >= 'a'.charCodeAt(0) && i <= 'z'.charCodeAt(0)) {
        else if (i > 96 && i < 123) {
            c = 3; // LOWER;
        }
        else if (i == 32 || "!@#$%^&*()_+-=/.,".includes(String.fromCharCode(i))) {
            c = 4; // PUNCTUATION_1;
        }
//        else {
//            c = 5; // PUNCTUATION_2;
//        }
        CHAR_CLASSES[i] = c;
//        if (!CLASS_CAPACITIES[c]) CLASS_CAPACITIES[c] = 0;
        CLASS_CAPACITIES[c] ??= 0;
        CLASS_CAPACITIES[c]++;
    }
    CLASS_CAPACITIES[6] = 128; // OTHER
    CLASS_CAPACITIES[5] = Math.floor(CLASS_CAPACITIES[5] * 1.8); // PUNCTUATION_2

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
            let cls = nc < 128 ? CHAR_CLASSES[nc] : 6; // or OTHER
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
        for (let cls = 0; cls < 7; cls++) {  // N_CLASSES
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
