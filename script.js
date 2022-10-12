let keyPad = document.querySelector('#keyPad');
let keys = keyPad.childNodes;

console.log(keys);

let inputElem = document.querySelector('#input');

let theNumber = 0;
const theNumberDiv = document.querySelector('#theNumber');
function setTheNumber(n) {
    theNumber = Number(n);
    inputElem.textContent = String(theNumber);
}

let operator = '';
let number2 = 0;
// returns a number, the result of the operation
function evaluateOperation()
{
    let result = theNumber;

    let n1 = theNumber;
    let op = operator;
    let n2 = number2;

    if (op === '+') {
        result = Number(n1 + n2);
    } else if (op === '-') {
        result = Number(n1 - n2);
    } else if (op === '*') {
        result = Number(n1 * n2);
    } else if (op === '/') {
        if (n2 === 0) {
            alert("No, you can not divide by zero.");
            return 0;
        } else {
            result = Number(n1 / n2);
        }
    }

    return result;
}

let readyToBeReset = false;

let operationOutput = document.querySelector('#operationOutput');
let keyToOperatorMap = {
    keyAdd : '+',
    keySubtract : '-',
    keyMultiply : '*',
    keyDivide : '/'
}

keys.forEach(k => k.addEventListener('click', e => {
    if (k.classList.contains('num')) {
        if (readyToBeReset) {
            readyToBeReset = false;
            inputElem.textContent = '';    
        }
        if (inputElem.textContent === '0')
            inputElem.textContent = '';
        inputElem.textContent = inputElem.textContent + k.textContent.toString();
    } else if (k.classList.contains('operator')) {
        setTheNumber(inputElem.textContent);

        if (k.id in keyToOperatorMap) {
            operator = keyToOperatorMap[k.id];
        } else {
            operator = '+';
        }

        operationOutput.textContent = theNumber + ' ' + operator;
        readyToBeReset = true;
    } else if (k.id === 'keyBackSpace') {
        inputElem.textContent = inputElem.textContent.slice(0, inputElem.textContent.length-1);
    } else if (k.id === 'keyEquals') {
        if (operator === '') {
            operationOutput.textContent = `${inputElem.textContent} = `;
            setTheNumber(inputElem.textContent);
            readyToBeReset = true;
            return;
        }
        
        if (!readyToBeReset)
            number2 = Number(inputElem.textContent);
        readyToBeReset = true;
        let prevNumber = theNumber;
        setTheNumber(evaluateOperation());

        operationOutput.textContent = `${prevNumber} ${operator} ${number2} = ${theNumber}`;
    } else if (k.id === 'keyClear') {
        setTheNumber(0);
        inputElem.textContent = '0';
        operator = '';
        operationOutput.textContent = ' ';
    } else if (k.id === 'keyDot') {
        if (inputElem.textContent.indexOf('.') !== -1)
            return;
        if (readyToBeReset) {
            readyToBeReset = false;
            inputElem.textContent = '';
        }
        inputElem.textContent += '.';
    }

    if (inputElem.textContent === '')
        inputElem.textContent = '0';
}));