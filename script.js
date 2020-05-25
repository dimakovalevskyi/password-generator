const DICTIONARY = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=?'
};

function getDictionary(options) {
    let result = '';

    for (let name in DICTIONARY) {
        if (!DICTIONARY.hasOwnProperty(name)) continue;

        if (options[name]) {
            result += DICTIONARY[name];
        }
    }

    return result;
}

function getRandomFromString(str) {
    return str[Math.floor(Math.random() * str.length)];
}

function generatePassword(options, length) {
    let dictionary = getDictionary(options);
    let result = '';

    if (!dictionary.length) {
        return 'Bad options';
    }

    for (let i = 0; i < length; i++) {
        result += getRandomFromString(dictionary);
    }

    return result;
}

document.addEventListener('DOMContentLoaded', () => {
    const lowercaseCheckbox = document.querySelector('#lowercaseCheckbox');
    const uppercaseCheckbox = document.querySelector('#uppercaseCheckbox');
    const numbersCheckbox = document.querySelector('#numbersCheckbox');
    const symbolsCheckbox = document.querySelector('#symbolsCheckbox');
    const lengthInput = document.querySelector('#lengthInput');
    const passwordInput = document.querySelector('#passwordInput');
    const generateButton = document.querySelector('#generateButton');
    const copyButton = document.querySelector('#copyButton');
    let options;

    function updateOptions() {
        options = {
            lowercase: lowercaseCheckbox.checked,
            uppercase: uppercaseCheckbox.checked,
            numbers: numbersCheckbox.checked,
            symbols: symbolsCheckbox.checked
        };
    }

    function changed() {
        updateOptions();
        localStorage.setItem('options', JSON.stringify(options));
        localStorage.setItem('length', JSON.stringify(parseInt(lengthInput.value, 10)));
        generate();
    }

    function load() {
        let optionsString = localStorage.getItem('options') || '{"lowercase": true,"uppercase": true,"numbers": true,"symbols": true}';
        let parsedOptions = JSON.parse(optionsString);

        lowercaseCheckbox.checked = parsedOptions.lowercase;
        uppercaseCheckbox.checked = parsedOptions.uppercase;
        numbersCheckbox.checked = parsedOptions.numbers;
        symbolsCheckbox.checked = parsedOptions.symbols;

        lengthInput.value = localStorage.getItem('length') || '6';
    }

    function generate() {
        let length = parseInt(lengthInput.value, 10) || 4;

        length = length >= 4 ? length : 4;

        updateOptions();
        passwordInput.value = generatePassword(options, length);
        copyButton.innerHTML = 'Copy';
    }

    function copy() {
        passwordInput.select();
        document.execCommand('copy');
        copyButton.innerHTML = 'Copied';
    }

    load();
    updateOptions();
    generate();

    [lowercaseCheckbox, uppercaseCheckbox, numbersCheckbox, symbolsCheckbox, generateButton]
        .forEach(item => item.addEventListener('change', changed));
    ['click', 'blur']
        .forEach(eventName => lengthInput.addEventListener(eventName, changed));
    generateButton.addEventListener('click', generate);
    copyButton.addEventListener('click', copy);
});
