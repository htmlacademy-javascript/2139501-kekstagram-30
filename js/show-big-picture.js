import {picturesContainer} from './get-pictures';
import {isEscapeKey} from './utils';

const bigPicturePopup = document.querySelector('.big-picture');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');
const bigPictureImage = bigPicturePopup.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = bigPicturePopup.querySelector('.likes-count');
const bigPictureCommentsCount = bigPicturePopup.querySelector('.social__comment-shown-count');
const bigPictureCommentsTotalCount = bigPicturePopup.querySelector('.social__comment-total-count');
const bigPictureDescription = bigPicturePopup.querySelector('.social__caption');
const bigPictureComments = document.querySelector('.social__comments');
const bigPictureCommentsTemplate = document.querySelector('#commentary').content.querySelector('.social__comment');
const commentsFragment = document.createDocumentFragment();
const bigPictureCommentsLoader = bigPicturePopup.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicturePopup.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  bigPictureCloseButton.removeEventListener('click', closeBigPicture);
};

const openBigPicture = () => {
  bigPicturePopup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  bigPictureCloseButton.addEventListener('click', closeBigPicture);
};

document.addEventListener('keydown', (evt) => {
  if(isEscapeKey(evt)) {
    closeBigPicture();
  }
});

const getBigPictureComments = (array, count) => {
  bigPictureComments.innerHTML = '';
  const newArr = array.slice(0, count);
  newArr.forEach((value) => {
    const comment = bigPictureCommentsTemplate.cloneNode(true);
    const avatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');
    avatar.src = value.avatar;
    avatar.alt = value.name;
    commentText.textContent = value.message;
    commentsFragment.append(comment);
  });
  if (array.length <= 5) {
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsCount.textContent = newArr.length;
  } else if (count >= array.length) {
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsCount.textContent = newArr.length;
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
    bigPictureCommentsCount.textContent = String(count);
  }
  return bigPictureComments.append(commentsFragment);
};

const getBigPicture = (obj) => {
  bigPictureImage.src = obj.url;
  bigPictureLikesCount.textContent = obj.likes;
  bigPictureCommentsTotalCount.textContent = String(obj.comments.length);
  bigPictureDescription.textContent = obj.description;
};

const showBigPicture = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    let count = 5;
    data.forEach((value) => {
      if (value.id === Number(evt.target.dataset.id)) {
        openBigPicture();
        getBigPicture(value);
        getBigPictureComments(value.comments, count);
        const getMoreComments = () => {
          count += 5;
          getBigPictureComments(value.comments, count);
        };
        bigPictureCommentsLoader.addEventListener('click', getMoreComments);
      }
    });
  });
};

export { showBigPicture };
