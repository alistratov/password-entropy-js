# data-password-entropy
Calculate password strength.


## Synopsis
```js
const { default: PasswordEntropy } = await import("data-password-entropy");
PasswordEntropy.passwordEntropy("password");  // 35
PasswordEntropy.passwordEntropy("Vgk4@HDk6X7gEp7");  // 85
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
