const passwordGeneratedElement = document.getElementById('password-generated');

const passwordGeneratorOptionsElement = document.getElementById(
  'password-generator-options'
);
const passwordGeneratorRangeElement = document.getElementById(
  'password-generator-range'
);
const passwordGeneratorLengthNumberElement = document.getElementById(
  'password-generator-length-number'
);

const strengthValueElement = document.getElementById('strength-value');
const uppercaseElement = document.getElementById('uppercase');
const lowercaseElement = document.getElementById('lowercase');
const numbersElement = document.getElementById('numbers');
const symbolsElement = document.getElementById('symbols');
const buttonGenerate = document.getElementById('button-generate');

const passwordStrengthMessages = ['TOO WEAK!', 'WEAK', 'MEDIUM', 'STRENGTH'];

const passwordOptions = {
  length: 0,
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '1234567890',
  symbols: '!@#$%^&*()_-+{}:.?'
};

let allCharactersAllowed = '';

const checkInputsChecked = () => document.querySelectorAll('input:checked');

const setAllowedCharacters = optionsChecked => {
  if (!optionsChecked.length) return;
  allCharactersAllowed = '';
  optionsChecked.forEach(
    option => (allCharactersAllowed += passwordOptions[option.id])
  );
};

const generatePassword = () => {
  let newPassword = '';
  for (let i = 0; i < passwordOptions.length; i++) {
    newPassword += allCharactersAllowed.charAt(
      Math.floor(Math.random() * allCharactersAllowed.length)
    );
  }

  passwordGeneratedElement.value = newPassword;
};

const setPasswordRange = value => {
  passwordOptions.length = value;
  passwordGeneratorLengthNumberElement.textContent = passwordOptions.length;
};

const setStrengthValue = optionsChecked => {
  if (passwordOptions.length < 5) {
    strengthValueElement.textContent = 'TOO SHORT';
  } else if (optionsChecked.length === 0) {
    strengthValueElement.textContent = 'NO OPTIONS CHECKED';
  } else {
    strengthValueElement.textContent =
      passwordStrengthMessages[optionsChecked.length - 1];
  }
};

passwordGeneratorOptionsElement.addEventListener('submit', e => {
  e.preventDefault();
  generatePassword();
});

passwordGeneratorOptionsElement.addEventListener('change', e => {
  const optionsChecked = checkInputsChecked();

  if (e.target.id === 'password-generator-range') {
    setPasswordRange(e.target.value);
  }

  if (optionsChecked.length > 0 && passwordOptions.length > 5) {
    buttonGenerate.removeAttribute('disabled');
  } else {
    buttonGenerate.setAttribute('disabled', '');
  }

  setStrengthValue(optionsChecked);
  setAllowedCharacters(optionsChecked);
});
