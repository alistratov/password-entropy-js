# data-password-entropy
Calculate password strength.

[![NPM - Version](https://img.shields.io/npm/v/data-password-entropy)](https://www.npmjs.com/package/data-password-entropy) [![codecov](https://codecov.io/gh/alistratov/password-entropy-js/graph/badge.svg)](https://codecov.io/gh/alistratov/password-entropy-js) [![NPM - Downloads](https://img.shields.io/npm/dm/data-password-entropy
)](https://npm-stat.com/charts.html?package=data-password-entropy) ![NPM Unpacked size](https://img.shields.io/npm/unpacked-size/data-password-entropy) ![NPM Bundle size](https://img.shields.io/bundlephobia/minzip/data-password-entropy)


## Synopsis
```bash
npm install data-password-entropy
```
```js
const { passwordEntropy } = require('data-password-entropy');
console.log(passwordEntropy('P@ssw0rd'));  // 47
```


## Overview
The `data-password-entropy` package provides a function to calculate the entropy of a password, measuring its strength against brute-force attacks. Unlike traditional rule-based methods that enforce specific criteria—such as minimum length or mandatory punctuation—which can either reject strong, unconventional passwords or accept weak ones like `P@ssw0rd`, entropy-based evaluation offers a more accurate assessment. By assigning a numerical value to a password's complexity and unpredictability, this empirical algorithm ensures that a password achieving an entropy score of 80 bits is considered sufficiently secure for most applications.

## See also
Similar packages for other languages:
* [npm](https://www.npmjs.com/package/data-password-entropy)
* [pypi](https://pypi.org/project/data-password-entropy/)
* [cpan](https://metacpan.org/pod/Data::Password::Entropy) (outdated)

Other implementations:
* [PasswordEntropy-JS](https://www.npmjs.com/package/@rabbit-company/password-entropy) by rabbit-company.com
* [string-entropy](https://www.npmjs.com/package/string-entropy)


## License
Copyright 2024 Oleh Alistratov

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at [http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0).

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
