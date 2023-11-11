import {isEscapeKey} from './utils.js';

const hashtagRegular = /^#[a-zа-яё0-9]{1,19}$/i;

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInterface = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const photoCommentInputField = imgUploadForm.querySelector('.text__description');
const photoHashtagsInputField = imgUploadForm.querySelector('.text__hashtags');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const closeModal = () => {
  imgUploadInterface.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  imgUploadInput.value = '';
  imgUploadForm.reset();
  pristine.reset();
  uploadCloseButton.removeEventListener('click', closeModal);
};

const openModal = () => {
  imgUploadInterface.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  uploadCloseButton.addEventListener('click', closeModal);
};

imgUploadInput.addEventListener('change', openModal);
document.addEventListener('keydown', (evt) => {
  if (photoCommentInputField === document.activeElement || photoHashtagsInputField === document.activeElement) {
    evt.stopPropagation();
  }
  if(isEscapeKey(evt)) {
    closeModal();
  }
});

//Валидация описания фотографии
const validateComment = (value) => value.length <= 140;

pristine.addValidator(
  photoCommentInputField,
  validateComment,
  'Не более 140 символов'
);
//Валидация хэш-тегов
const getHashtagNormalize = (tagString) => tagString
  .toLowerCase()
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));
const validateHashtagSymbols = (value) => getHashtagNormalize(value).every((tag) => hashtagRegular.test(tag));
const validateHashtagsCount = (value) => getHashtagNormalize(value).length <= 5;
const validateHashtagsUnic = (value) => getHashtagNormalize(value).length === new Set(getHashtagNormalize(value)).size;

pristine.addValidator(
  photoHashtagsInputField,
  validateHashtagSymbols,
  'Введите корректный хэш-тег'
);
pristine.addValidator(
  photoHashtagsInputField,
  validateHashtagsCount,
  'Не более 5 хэш-тегов'
);
pristine.addValidator(
  photoHashtagsInputField,
  validateHashtagsUnic,
  'Хэш-теги не должны повторяться'
);
imgUploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
