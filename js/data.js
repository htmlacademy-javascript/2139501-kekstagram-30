import {getRandomInteger, getRandomArrayElement, getRandomId} from './utils.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Передо мной интересная фотография.',
  'Давайте рассмотрим изображение внимательнее.',
  'Почему вы не хотите быть самим собой?',
  'Луна – бесстыжее создание',
  'Где я спешил, взбираясь к небесам',
  'Разместить анонс',
  'Им нет числа, их легион',
  'Лишь только сбросят в бездну лета',
];

const NAMES = [
  'Никита',
  'Марк',
  'Денис',
  'Михаил',
  'Лидия',
  'Николай',
  'Андрей',
  'Глеб',
  'София',
  'Вероника',
];

const randomId = getRandomId(1, 25);
const randomUrl = getRandomId(1, 25);
const randomCommentId = getRandomId(1, 1000);

//Функция для создания объекта с комментарием
const createCommentsInfo = () => ({
  id: randomCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

//Функция для создания объекта с описанием к фотографии
const createPictureInfo = () => (
  {
    id: randomId(),
    url: `photos/${randomUrl()}.jpg`,
    description: DESCRIPTIONS[getRandomArrayElement(DESCRIPTIONS)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createCommentsInfo)
  }
);

//Создаём массив объектов с комментариями
const getPhotoArray = () => {
  const photoDescriptionArray = [];

  while(photoDescriptionArray.length < 25) {
    photoDescriptionArray.push(createPictureInfo());
  }
  return photoDescriptionArray;
};

export {getPhotoArray};
