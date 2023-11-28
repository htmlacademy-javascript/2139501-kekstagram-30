import {picturesContainer} from './get-pictures';
import {isEscapeKey} from './utils';

const COMMENTS_SHOWN = 5;

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
  document.removeEventListener('keydown', closeByEscape);
};

const openBigPicture = () => {
  bigPicturePopup.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', closeByEscape);
};

function closeByEscape (evt) {
  if(isEscapeKey(evt)) {
    closeBigPicture();
  }
}

bigPictureCloseButton.addEventListener('click', closeBigPicture);

const getBigPictureComments = (comments, commentsCount) => {
  bigPictureComments.innerHTML = '';
  const slicedComments = comments.slice(0, commentsCount);
  slicedComments.forEach((value) => {
    const comment = bigPictureCommentsTemplate.cloneNode(true);
    const avatar = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');
    avatar.src = value.avatar;
    avatar.alt = value.name;
    commentText.textContent = value.message;
    commentsFragment.append(comment);
  });
  if (comments.length <= COMMENTS_SHOWN) {
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsCount.textContent = slicedComments.length;
  } else if (commentsCount >= comments.length) {
    bigPictureCommentsLoader.classList.add('hidden');
    bigPictureCommentsCount.textContent = slicedComments.length;
  } else {
    bigPictureCommentsLoader.classList.remove('hidden');
    bigPictureCommentsCount.textContent = String(commentsCount);
  }
  return bigPictureComments.append(commentsFragment);
};

const getBigPicture = (dataObject) => {
  bigPictureImage.src = dataObject.url;
  bigPictureLikesCount.textContent = dataObject.likes;
  bigPictureCommentsTotalCount.textContent = String(dataObject.comments.length);
  bigPictureDescription.textContent = dataObject.description;
};

const showBigPicture = (data) => {
  picturesContainer.addEventListener('click', (evt) => {
    let count = COMMENTS_SHOWN;
    data.forEach((value) => {
      if (value.id === Number(evt.target.closest('.picture').dataset.id)) {
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
