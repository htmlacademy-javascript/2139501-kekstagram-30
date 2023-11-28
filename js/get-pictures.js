const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();

const getPictures = (data) => {
  data.forEach(({id, url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    const photo = picture.querySelector('.picture__img');
    picture.dataset.id = id;
    photo.src = url;
    photo.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.append(picture);
  });

  return picturesContainer.append(picturesFragment);
};

export {getPictures, picturesContainer};
