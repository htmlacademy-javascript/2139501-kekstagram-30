const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderField = document.querySelector('.effect-level__slider');
const effectsContainer = document.querySelector('.effects__list');
const effectValue = document.querySelector('.effect-level__value');
const photo = document.querySelector('.img-upload__preview img');
const noneEffectButton = document.querySelector('#effect-none');

sliderContainer.classList.add('hidden');

noUiSlider.create(sliderField, {
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
  sliderField.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max
    },
    start: max,
    step: step
  });
};
const getEffect = (effect, unit) => {
  sliderContainer.classList.remove('hidden');
  sliderField.noUiSlider.on('update', () => {
    photo.style.filter = `${effect}(${sliderField.noUiSlider.get()}${unit})`;
    effectValue.value = Number(sliderField.noUiSlider.get());
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
    sliderContainer.classList.add('hidden');
    photo.style.filter = '';
  }
});

const resetEffects = () => {
  sliderContainer.classList.add('hidden');
  photo.style.filter = '';
  noneEffectButton.checked = true;
};

sliderField.noUiSlider.on('update',() => {
  effectValue.setAttribute('value', String(sliderField.noUiSlider.get(true)));
});

export {resetEffects};
