import {getServerData} from './server.js';
import {getPictures} from './get-pictures.js';
import {showBigPicture} from './show-big-picture.js';
import './form-validate.js';
import './photo-scale.js';
import './slider-effects.js';

getServerData(getPictures);
getServerData(showBigPicture);
