import React, {ReactElement} from 'react';
import './UIGallery.scss';
import {IProps} from './types';
import Glide from 'react-glidejs';

import 'react-glidejs/dist/index.css';
import {IPhoto} from '../../types';
import {UIImage} from '../UIImage';
import {UILoader} from '../UILoader';

export const UIGallery = (props: IProps): ReactElement => {
  const gliderRef = React.useRef(null);
  const [showSlider, setShowSlider] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  if (props.gallery && props.gallery.photos) {
    return (
      <>
        {showSlider && (
          <div className="ui-gallery--glide-wrapper">
            <Glide
              className={ 'ui-gallery--slideshow' }
              ref={ gliderRef }
              throttle={ 0 }
              type="slider"
              peek={ {
                before: 100,
                after: 100,
              } }
              perView={ 1 }
              startAt={ index }
              slideClassName="slider__frame">
              {props.gallery && props.gallery.photos && props.gallery.photos.map((photo, index) => {
                return (
                  <div key={ index }>
                    <img src={ props.baseUrl + photo.fullSizePath } />
                  </div>
                );
              })}
            </Glide>
          </div>
        )}

        <div className="ui-gallery grid-container grid-two-columns">
          {props.gallery.photos && props.gallery.photos.map((photo: IPhoto, index) => {
            return (
              <div className="grid-item" key={ index }>
                <UIImage
                  alt={ photo.description }
                  source={ props.baseUrl + photo.mediumThumbPath }
                  onClick={ () => {
                    // setCurrentImage(photo);
                    setIndex(index);
                    setShowSlider(true);
                  } }
                  label={ {text: photo.description} }
                />
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <div className="ui-gallery grid-container grid-two-columns">
        {[...Array(props.skeletons || 10)].map((key, index) => {
          return (
            <div className="grid-item" key={ index }>
              <UILoader />
            </div>
          );
        })}
      </div>
    );
  }
};
