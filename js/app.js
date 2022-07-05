const page = document.querySelector('main');
const keyboard = document.createElement('div');
const title = document.createElement('h1');
const codeDisplay = document.createElement('h2');
const enteredCodeDisplay = document.createElement('div');
const bottomRow = document.createElement('div');
const deleteButton = document.createElement('button');
const timeoutInterval = 1000 * 1.3;
const keyboardAlphabet = {
  2: 'abc',
  3: 'def',
  4: 'ghi',
  5: 'jkl',
  6: 'mno',
  7: 'pqrs',
  8: 'tuv',
  9: 'wxyz',
};

let code = createFourDigitNumber();
let enteredCode = '';

title.innerText = 'Enter Passcode';
page.append(title);
createCirclesForentredCodeDisplay();
enteredCodeDisplay.classList.add('entered-code-display');
page.append(enteredCodeDisplay);
codeDisplay.innerText = `Code : ${code}`;
page.append(codeDisplay);

creatInputButtonsToKeyboard();

keyboard.classList.add('keyboard');
page.append(keyboard);
deleteButton.innerText = 'Delete';
deleteButton.addEventListener('click', deleteCode);
bottomRow.append(deleteButton);
page.append(bottomRow);

function checkPassCode(number) {
  const codeDisplay = document.querySelector('h2:nth-child(3)');
  const buttons = document.querySelectorAll('button');
  const deletebutton = document.querySelector('div:last-child button');

  deleteButton.disabled = false;
  enteredCode += number;
  if (enteredCode.length === 4 && enteredCode === code) {
    buttons.forEach((button) => {
      button.disabled = true;
    });
    fillEnteredCodeDisplay(enteredCode.length);
    code = createFourDigitNumber();
    enteredCode = '';
    setTimeout(() => {
      fillEnteredCodeDisplay(enteredCode.length);
    }, 400);
    setTimeout(() => {
      buttons.forEach((button) => {
        button.disabled = false;
      });
      codeDisplay.innerText = `Code: ${code}`;
    }, 700);
    return;
  }
  if (enteredCode.length === 4) {
    buttons.forEach((button) => {
      button.disabled = true;
    });
    enteredCodeDisplay.classList.add('error');
    fillEnteredCodeDisplay(enteredCode.length);
    enteredCode = '';
    setTimeout(() => {
      fillEnteredCodeDisplay(enteredCode.length);
    }, timeoutInterval - 300);
    setTimeout(() => {
      buttons.forEach((button) => {
        button.disabled = false;
      });
      enteredCodeDisplay.classList.remove('error');
    }, timeoutInterval);
    return;
  }
  fillEnteredCodeDisplay(enteredCode.length);
}

function creatInputButtonsToKeyboard() {
  for (let i = 0; i < 10; i++) {
    const button = document.createElement('button');
    button.innerHTML = `<span>${i}</span> <span>${
      keyboardAlphabet[i] ? keyboardAlphabet[i] : ''
    }</span>`;
    button.addEventListener('click', () => {
      checkPassCode(i);
    });
    keyboard.append(button);
  }
}

function createFourDigitNumber() {
  let number = '';
  for (let i = 0; i < 4; i++) {
    number += `${Math.floor(Math.random() * 10)}`;
  }
  return number;
}

function createCirclesForentredCodeDisplay() {
  for (let i = 0; i < 4; i++) {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    enteredCodeDisplay.append(circle);
  }
}

function fillEnteredCodeDisplay(codeLength) {
  const circles = document.querySelectorAll('.circle');
  circles.forEach((circle) => {
    circle.classList.remove('fill');
  });
  circles.forEach((circle, index) => {
    if (index < codeLength) {
      circle.classList.add('fill');
    }
  });
}

function deleteCode() {
  button = document.querySelector('div:last-child button');
  if (enteredCode.length === 0) {
    button.disabled = true;
  }
  enteredCode = enteredCode.slice(0, -1);
  fillEnteredCodeDisplay(enteredCode.length);
}
