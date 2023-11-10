import {getPictures, picturesContainer, picturesArrayObj} from './getPictures.js';
import {isEscapeKey} from './utils.js';

getPictures();

const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const bigPictureImage = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPicturePopup.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicturePopup.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicturePopup.querySelector('.social__caption');

const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCommentsTemplate = document.querySelector('#commentary').content.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const bigPictureCommentsCounter = bigPicturePopup.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicturePopup.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicturePopup.classList.add('hidden');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
};

const openBigPicture = () => {
  bigPicturePopup.classList.remove('hidden');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
  bigPictureCommentsCounter.classList.add('hidden');
  bigPictureCommentsLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const onEscCloseBigPicture = (evt) => {
  if (isEscapeKey(evt)) {
    bigPicturePopup.classList.add('hidden');
    picturesContainer.removeEventListener('keydown', onEscCloseBigPicture);
  }
};

const getBigPictureComments = (array) => {
  bigPictureComments.innerHTML = '';
  array.forEach((value) => {
    const comment = bigPictureCommentsTemplate.cloneNode(true);
    const avatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');
    avatar.src = value.avatar;
    avatar.alt = value.name;
    commentText.textContent = value.message;
    commentsFragment.append(comment);
  });
  return bigPictureComments.append(commentsFragment);
};

const getBigPicture = (obj) => {
  bigPictureImage.src = obj.url;
  bigPictureLikesCount.textContent = String(obj.likes);
  bigPictureCommentsCount.textContent = String(obj.comments.length);
  bigPictureDescription.textContent = obj.description;
};

picturesContainer.addEventListener('click', (evt) => {
  picturesArrayObj.forEach((value) => {
    if (value.id === Number(evt.target.dataset.id)) {
      openBigPicture();
      getBigPicture(value);
      getBigPictureComments(value.comments);
      picturesContainer.addEventListener('keydown', onEscCloseBigPicture);
    }
  });
});
