const sliderContainer = document.querySelector('.effect-level__slider');
const effectsContainer = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value');
const photo = document.querySelector('.img-upload__preview img');

document.querySelector('.img-upload__effect-level').classList.add('hidden');

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
const getSliderUpdate = (min, max, step) => {
  sliderContainer.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });
};
const getEffect = (effect, unit) => {
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
  sliderContainer.noUiSlider.on('update', () => {
    photo.style.filter = `${effect}(${sliderContainer.noUiSlider.get()}${unit})`;
    effectValue.value = sliderContainer.noUiSlider.get();
  });
};

effectsContainer.addEventListener('change', (evt) => {
  if (evt.target.id === 'effect-chrome') {
    getSliderUpdate(0, 1, 0.1);
    getEffect('grayscale','');
  } else if (evt.target.id === 'effect-sepia') {
    getSliderUpdate(0, 1, 0.1);
    getEffect('sepia','');
  } else if (evt.target.id === 'effect-marvin') {
    getSliderUpdate(0, 100, 1);
    getEffect('invert','%');
  } else if (evt.target.id === 'effect-phobos') {
    getSliderUpdate(0, 3, 0.1);
    getEffect('blur','px');
  } else if (evt.target.id === 'effect-heat') {
    getSliderUpdate(1, 3, 0.1);
    getEffect('brightness','');
  } else {
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    photo.style.filter = '';
  }
});
