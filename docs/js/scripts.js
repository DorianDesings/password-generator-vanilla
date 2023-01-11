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

const allCheckbox = [...document.querySelectorAll('input[type="checkbox"]')];
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

const checkInputsChecked = () =>
  allCheckbox.filter(checkbox => checkbox.checked);

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
  if (!optionsChecked.length) return;
  if (passwordOptions.length < 5) {
    strengthValueElement.textContent = 'TOO SHORT';
  } else {
    passwordStrengthMessages[optionsChecked.length - 1];
  }
};

passwordGeneratorOptionsElement.addEventListener('submit', e => {
  e.preventDefault();
  if (buttonGenerate.disabled) return;
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
    buttonGenerate.setAttribute('disabled', 'true');
  }

  setStrengthValue(optionsChecked);
  setAllowedCharacters(optionsChecked);
});
