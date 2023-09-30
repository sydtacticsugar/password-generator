// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const lowerEl = document.getElementById('lowercase');
const upperEl = document.getElementById('uppercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// EVENTS
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowerEl.checked;
    const hasUpper = upperEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbols = symbolsEl.checked;
    
    resultEl.innerText = generatePassword(
        hasLower, 
        hasUpper, 
        hasNumber, 
        hasSymbols, 
        length
    );
});


// cp pw to cb
clipboardEl.addEventListener('click', () => {
    // Select the text field
	let text = resultEl.textContent;
    // Copy the text inside the text field
	navigator.clipboard.writeText(`${text}`);
    // Alert the copied text
	alert(`Password copied to clipboard!`);
});
 

// GENERATE PASSWORD FUNCTION
function generatePassword(lower, upper, number, symbol, length) {
    // init pw var
    let generatedPassword = '';
    
    // filter out unchecked settings
    const typesCount = lower + upper + number + symbol;
    
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

    // console.log('typesCount: ', typesCount);
    // console.log('typesArr: ', typesArr);

    // return empty string if all are unchecked
    if(typesCount === 0){
        return '';
    }

    // loop over length - call generator function for each type
    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            
            // console.log('funcName: ', funcName);
            
            generatedPassword += randomFunc[funcName]();
        });
    }

    // add final pw to pw var and return
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}


// GENERATOR FUNCTIONS
const randomFunc = {
    lower : getRandomLower,
    upper : getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// char set reference: https://net-comber.com/charset.html
// special chars list: https://owasp.org/www-community/password-special-characters

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);   
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);    
}

function getRandomSymbol() {
    const symbols = '!#$%&()*,-./<=>?@[]^_{}~';
    return symbols[Math.floor(Math.random() * symbols.length)];
}


