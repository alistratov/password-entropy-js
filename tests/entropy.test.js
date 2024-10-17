const { passwordEntropy } = require('../src');

const testCases = [
    ['', 0],
    ['0', 3],
    [' ', 4],
    ['a', 4],
    ['\t', 5],
    ['123456', 10],
    ['qwerty', 28],
    ['P@ssw0rd', 47],
    ['!ab#cd$', 32],
    ['zuqiuxinyongwangkaihu', 72],
    ['1qaz2wsx', 41],
    ['jackslippedonicefellonhisass', 79],
    ['JackSlippedOnIceFellOnHisAss', 117],
    ['at&t', 19],
    ['aa', 7],
    ['aaa', 7],
    ['aaaa', 8],
    ['aaab', 12],
    ['aaax', 12],
    ['aaaaaaaaaaaaaaaaax', 13],
    ['1234', 9],
    ['1243', 13],
    ['abab', 12],
    ['abba', 14],
    ['ababab', 14],
    ['abcd', 13],
    ['xkcd', 18],
    ['!!', 6],
    ['..', 6],
    ['~~', 7],
    ['password1', 43],
    ['123456789', 12],
    ['abc123', 21],
    ['1q2w3e4r5t6y7u8i9o0p', 93],
    ['!!!!44yankee!!!', 47],
    ['😀', 7],
    ['петрик п\'яточкін', 105],
    ['жёлтаяжирнаяжирафа', 87],
    ['Großer grüner grinsender Gorilla', 136],
    ['Vgk4@HDk6X7gEp7', 85],
    ['2vCzzE.Zr3rNSWS', 85],
    ['QP4ZPzuRFmCgW.f', 91],
    ['JJ4ADWxi6pnrX@7', 91]
];

describe('passwordEntropy', () => {
    test.each(testCases)(
        'Calculates entropy for password "%s"',
        (password, expected) => {
            expect(passwordEntropy(password)).toBe(expected);
        }
    );
});
