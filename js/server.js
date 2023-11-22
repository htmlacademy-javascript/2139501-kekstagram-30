import {isEscapeKey} from './utils';
import {showBigPicture} from './show-big-picture';
import {closeModal} from './form-validate';
import {resetScale} from './photo-scale';
import {resetEffects} from './slider-effects';
import {initSort} from './sort';

const downloadErrorTemplateContent = document.querySelector('#data-error').content.querySelector('.data-error');

const uploadErrorTemplateContent = document.querySelector('#error').content.querySelector('.error');
const uploadErrorCloseButton = uploadErrorTemplateContent.querySelector('.error__button');

const successTemplateContent = document.querySelector('#success').content.querySelector('.success');
const successCloseButton = successTemplateContent.querySelector('.success__button');
const successWrapper = successTemplateContent.querySelector('.success__inner');
const successTitle = successTemplateContent.querySelector('.success__title');
const removeDownloadErrorMessage = () => downloadErrorTemplateContent.remove();

const getDownloadErrorMessage = () => {
  downloadErrorTemplateContent.cloneNode(true);
  document.body.append(downloadErrorTemplateContent);
  setTimeout(removeDownloadErrorMessage, 5000);
};

const removeSuccessMessage = () => {
  successTemplateContent.remove();
  successCloseButton.removeEventListener('click', removeSuccessMessage);
};

const getSuccessMessage = () => {
  successTemplateContent.cloneNode(true);
  document.body.append(successTemplateContent);
  successCloseButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      removeSuccessMessage();
    }
  });
  successTemplateContent.addEventListener('click', (evt) => {
    if (evt.target !== successWrapper && evt.target !== successTitle) {
      removeSuccessMessage();
    }
  });
};

const removeUploadErrorMessage = () => {
  uploadErrorTemplateContent.remove();
  uploadErrorCloseButton.removeEventListener('click', removeUploadErrorMessage);
};

const getUploadErrorMessage = () => {
  uploadErrorTemplateContent.cloneNode(true);
  document.body.append(uploadErrorTemplateContent);
  uploadErrorCloseButton.addEventListener('click', removeUploadErrorMessage);
  document.addEventListener('keydown', (evt) => {
    if(isEscapeKey(evt)) {
      removeUploadErrorMessage();
    }
  });
};

const getServerData = (getPictures) => {
  fetch('https://30.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if(!response.ok) {
        getDownloadErrorMessage();
      }
      return response.json();
    })
    .then((pictures) => {
      getPictures(pictures);
      showBigPicture(pictures);
      initSort(pictures);
    })
    .catch(() => {
      getDownloadErrorMessage();
    });
};


const sendServerData = (formData) => {
  fetch(
    'https://30.javascript.pages.academy/kekstagram/',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if(!response.ok) {
        getUploadErrorMessage();
      } else {
        getSuccessMessage();
        closeModal();
        resetScale();
        resetEffects();
      }
    })
    .catch(() => {
      getUploadErrorMessage();
    });
};
export {getServerData, sendServerData};
