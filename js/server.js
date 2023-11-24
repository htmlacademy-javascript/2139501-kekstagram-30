import {showBigPicture} from './show-big-picture';
import {closeModal} from './form-validate';
import {resetScale} from './photo-scale';
import {resetEffects} from './slider-effects';
import {initSort} from './sort';
import {getDownloadErrorMessage, getSuccessMessage, getUploadErrorMessage} from './server-error-messages';

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
