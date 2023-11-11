const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const photo = document.querySelector('.img-upload__preview img');


scaleSmaller.addEventListener('click', () => {
  if (parseInt(scaleValue.value, 10) - 25 >= 25) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) - 25}%`;
    photo.style.transform = `scale(${scaleValue.value})`;
  }
});

scaleBigger.addEventListener('click', () => {
  if(parseInt(scaleValue.value, 10) + 25 <= 100) {
    scaleValue.value = `${parseInt(scaleValue.value, 10) + 25}%`;
    photo.style.transform = `scale(${scaleValue.value})`;
  }
});
