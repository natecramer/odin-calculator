let keyPad = document.querySelector('#keyPad');
let keys = keyPad.childNodes;

console.log(keys);

let inputElem = document.querySelector('#input');

let theNumber = 0;
const theNumberDiv = document.querySelector('#theNumber');
function setTheNumber(n) {
    theNumber = Number(n);

    // theNumberDiv.textContent = String(theNumber);
    inputElem.textContent = String(theNumber);
}

let operationString = '';

// let operation = '';
let operator = '';
let number2 = 0;
// returns a number, the result of the operation
function evaluateOperationString()
{
    let result = theNumber;

    let n1 = theNumber;
    let op = operator;
    let n2 = number2;

    if (op === '+') {
        result = Number(n1 + n2);
    } else if (op === '-') {
        result = Number(n1 - n2);
    }

    return result;
}

let readyToBeReset = false;

let operationOutput = document.querySelector('#operationOutput');

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

        if (k.id === 'keyAdd') {
            operator = '+';
        } else if (k.id === 'keySubtract') {
            operator = '-';
        }

        operationOutput.textContent = theNumber + ' ' + operator;
        readyToBeReset = true;
    } else if (k.id === 'keyBackSpace') {
        inputElem.textContent = inputElem.textContent.slice(0, inputElem.textContent.length-1);
    } else if (k.id === 'keyEquals') {
        operation = '';
        if (!readyToBeReset)
            number2 = Number(inputElem.textContent);
        readyToBeReset = true;
        let prevNumber = theNumber;
        setTheNumber(evaluateOperationString());
        // operationOutput.textContent = prevNumber + ' ' + operator + number2 + '=' + theNumber;
        operationOutput.textContent = `${prevNumber} ${operator} ${number2} = ${theNumber}`;
    } else if (k.id === 'keyClear') {
        setTheNumber(0);
        inputElem.textContent = '0';
        operator = '';
        operationOutput.textContent = ' ';
    }

    if (inputElem.textContent === '')
        inputElem.textContent = '0';
}));