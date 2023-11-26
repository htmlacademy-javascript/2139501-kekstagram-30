import {isEscapeKey} from './utils';

const ERROR_TIMEOUT = 5000;

const downloadErrorTemplateContent = document.querySelector('#data-error').content.querySelector('.data-error');
const uploadErrorTemplateContent = document.querySelector('#error').content.querySelector('.error');
const uploadErrorPopup = document.querySelector('#error').content.querySelector('.error__inner');
const uploadErrorCloseButton = uploadErrorTemplateContent.querySelector('.error__button');
const successTemplateContent = document.querySelector('#success').content.querySelector('.success');
const successCloseButton = successTemplateContent.querySelector('.success__button');
const successWrapper = successTemplateContent.querySelector('.success__inner');
const successTitle = successTemplateContent.querySelector('.success__title');

const removeDownloadErrorMessage = () => downloadErrorTemplateContent.remove();

const getDownloadErrorMessage = () => {
  downloadErrorTemplateContent.cloneNode(true);
  document.body.append(downloadErrorTemplateContent);
  setTimeout(removeDownloadErrorMessage, ERROR_TIMEOUT);
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
  document.removeEventListener('click', removeUploadErrorMessage);
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
  document.addEventListener('click', (event) => {
    if (event.target !== uploadErrorPopup) {
      removeUploadErrorMessage();
    }
  });
};

export {getDownloadErrorMessage, getSuccessMessage, getUploadErrorMessage};
