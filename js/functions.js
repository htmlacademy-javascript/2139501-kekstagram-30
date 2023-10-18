//Функция для проверки длины строки.
const checkStringLength = function(verifiableString, requiredLength) {
  return verifiableString.length <= requiredLength;
};

checkStringLength('проверяемая строка', 20);

//Функция для проверки, является ли строка палиндромом.

const checkForPalindrome = function(verifiableString) {

  let normalizedString = verifiableString.replaceAll(' ', '');
  normalizedString = normalizedString.toLowerCase();

  let palindrome = '';

  for(let i = normalizedString.length - 1; i >= 0; i--) {
    palindrome += normalizedString[i];
  }
  return palindrome === normalizedString;
};

checkForPalindrome('Лёша на полке клопа нашёл ');
