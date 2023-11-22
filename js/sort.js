import { getPictures } from './get-pictures';
import { debounce, randomNumGenerator } from './utils';

const filtersContainer = document.querySelector('.img-filters');
const sortButtons = filtersContainer.querySelectorAll('.img-filters__button');
const defaultSortButton = filtersContainer.querySelector('#filter-default');
const randomSortButton = filtersContainer.querySelector('#filter-random');
const discussedSortButton = filtersContainer.querySelector('#filter-discussed');

const activeButtonToggle = (evt) => {
  if (evt.target.classList.contains('img-filters__button--active')) {
    return;
  }
  sortButtons.forEach((item) => item.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

//Сортировка по умолчанию
const defaultSorting = (evt, pictures, removePicturesCb) => {
  activeButtonToggle(evt);
  removePicturesCb();
  getPictures(pictures);
};

//10 рандомных картинок
const randomSorting = (evt, pictures, removePicturesCb) => {
  activeButtonToggle(evt);
  let newArr = [];
  const randomNum = randomNumGenerator(0, pictures.length - 1);
  for (let i = 0; i < pictures.length; i++) {
    const index = randomNum();
    newArr.push(pictures[index]);
  }
  newArr = newArr.slice(0,10);
  removePicturesCb();
  getPictures(newArr);
};

//Сортировка по количеству комментариев
const discussedSorting = (evt, pictures, removePicturesCb) => {
  activeButtonToggle(evt);
  const newArr = pictures.slice();
  newArr.sort((a,b) => {
    if(a.comments.length > b.comments.length) {
      return -1;
    }
  });
  removePicturesCb();
  getPictures(newArr);
};

const debouncedDefSort = debounce(defaultSorting);
const debouncedRandomSort = debounce(randomSorting);
const debouncedDiscussSort = debounce(discussedSorting);

const initSort = (data) => {
  const removePicturesList = () => document.querySelectorAll('.picture')
    .forEach((item) => item.remove());

  filtersContainer.classList.remove('img-filters--inactive');

  defaultSortButton.addEventListener('click', (evt) => {
    debouncedDefSort(evt, data, removePicturesList);
  });

  randomSortButton.addEventListener('click', (evt) => {
    debouncedRandomSort(evt, data, removePicturesList);
  });

  discussedSortButton.addEventListener('click', (evt) => {
    debouncedDiscussSort(evt, data, removePicturesList);
  });
};

export {initSort};
