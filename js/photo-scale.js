const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');


scaleSmaller.addEventListener('click', () => {
  if (parseInt(scaleValue.value, 10) - SCALE_STEP >= SCALE_MIN) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - SCALE_STEP}%`;
    photo.style.transform = `scale(${scaleValue.value})`;
  }
});

scaleBigger.addEventListener('click', () => {
  if(parseInt(scaleValue.value, 10) + SCALE_STEP <= SCALE_MAX) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + SCALE_STEP}%`;
    photo.style.transform = `scale(${scaleValue.value})`;
  }
});

const resetScale = () => {
  photo.style.transform = '';
  scaleValue.value = '100%';
};

export {resetScale};
