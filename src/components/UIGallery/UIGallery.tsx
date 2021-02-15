import React, {ReactElement} from 'react';
import './UIGallery.scss';
import {IProps} from './types';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import {IPhoto} from '../../types';
import {UIImage} from '../UIImage';

const getSkeletonArray = (amount: number) => {
  const tempArray: null[] = [];
  for (let i = 0; i < amount; i++) {
    tempArray.push(null);
  }

  return tempArray;
};

export const UIGallery = (props: IProps): ReactElement => {
  const gliderRef = React.useRef(null);

  const [data, setData] = React.useState<any>(getSkeletonArray(props.skeletons || 10));
  const [showSlider, setShowSlider] = React.useState<boolean>(false);
  const [index, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    document.addEventListener('keyup', handleEventListeners);

    return () => {
      document.removeEventListener('keyup', handleEventListeners);
    };
  }, []);

  React.useEffect(() => {
    if (props.gallery) {
      setData(props.gallery.photos);
    }
  }, [props.gallery]);

  const handleEventListeners = (event) => {
    switch (event.key) {
      case 'Escape':
        setShowSlider(false);
        break;
    }
  };

  return (
    <>
      {showSlider && (
        <div className="ui-gallery--glide-wrapper"
          onClick={ () => {
            setShowSlider(false);
          } }>
          <Glide
            className={ 'ui-gallery--slideshow' }
            ref={ gliderRef }
            throttle={ 0 }
            gap={ 100 }
            type="slider"
            peek={ {
              before: 200,
              after: 200,
            } }
            perView={ 1 }
            autoplay={ false }
            startAt={ index }
            slideClassName="slider__frame">
            {props.gallery && props.gallery.photos && props.gallery.photos.map((photo, index) => {
              return (
                <div key={ index } className="slider__img_wrapper">
                  <img src={ props.baseUrl + photo.fullSizePath } />
                </div>
              );
            })}
          </Glide>
        </div>
      )}

      <div className="ui-gallery grid-container grid-two-columns">
        {data.map((photo: IPhoto, index) => {
          return (
            <div className="grid-item" key={ index }>
              <UIImage
                alt={ photo ? photo.description : '' }
                source={ photo ? (props.baseUrl + photo.mediumThumbPath) : '' }
                onClick={ () => {
                  if (photo) {
                    setIndex(index);
                    setShowSlider(true);
                  }
                } }
                label={ {text: photo ? photo.description : ''} }
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
