import {getRandomInteger, getRandomArrayElement, getRandomId} from './utils.js';
import {NAMES, MESSAGES, DESCRIPTIONS} from './data.js';

const PHOTOS_COUNT = 25;
const AVATARS_COUNT = 6;
const MIN_COMMENTS_COUNT = 1;
const MAX_COMMENTS_COUNT = 30;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const generatePhotoId = getRandomId(1, PHOTOS_COUNT);
const generateImageId = getRandomId(1, PHOTOS_COUNT);
const generateCommentId = getRandomId(1, 1000);

//Функция для создания объекта с комментарием
const createCommentsInfo = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

//Создаём случайное число комментариев
const getComments = () => {
  const array = [];
  for (let i = 0; i <= getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); i++) {
    array.push(createCommentsInfo());
  }
  return array;
};

//Функция для создания объекта с описанием к фотографии
const createPictureInfo = () => (
  {
    id: generatePhotoId(),
    url: `photos/${ generateImageId() }.jpg`,
    description: DESCRIPTIONS[getRandomArrayElement(DESCRIPTIONS)],
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: getComments()
  });

//Создаём массив объектов с комментариями
const getPhotoArray = () => {
  const photoDescriptionArray = [];

  while(photoDescriptionArray.length < PHOTOS_COUNT) {
    photoDescriptionArray.push(createPictureInfo());
  }
  return photoDescriptionArray;
};

export {getPhotoArray};
