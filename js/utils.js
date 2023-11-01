//Генератор случайных чисел в заданном диапазоне
const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

//Функция для извлечения случайной строки из массива
const getRandomArrayElement = (elements) => getRandomInteger(0, elements.length - 1);

//Функция-генератор случайного числа в заданном диапазоне
const getRandomId = (min, max) => {
  const previousId = [];
  return function () {
    let currentId = getRandomInteger(min, max);
    if (previousId.length >= (max - min + 1)) {
      return null;
    }
    while (previousId.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    previousId.push(currentId);
    return currentId;
  };
};

export {getRandomInteger, getRandomArrayElement, getRandomId};
