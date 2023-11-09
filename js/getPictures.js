import {getPhotoArray} from './getPhotoArray.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesArrayObj = getPhotoArray();
const picturesFragment = document.createDocumentFragment();

const getPictures = () => {
  picturesArrayObj.forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.append(picture);
  });

  return picturesContainer.append(picturesFragment);
};

//Убираем заглушку с заголовка списка фотографий
picturesContainer.querySelector('.pictures__title').classList.remove('visually-hidden');

export {getPictures};
