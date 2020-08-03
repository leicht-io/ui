import {IProps} from './types';
import React from 'react';
import './UISlider.scss';
import Glide from '@glidejs/glide';
import {UILoader} from '../UILoader';

export const UISlider = (props: IProps) => {
  const [slider]: Glide = React.useState<Glide>(new Glide('.glide', {
    startAt: 0,
    hoverPause: true,
    type: 'carousel'
  }));

  React.useEffect(() => {
    return () => slider.destroy();
  }, []);

  React.useEffect(() => {
    if (props.slides) {
      slider.mount();
    }
  }, [props.slides]);

  if (!props.slides) {
    return (
      <div className="glide">
        <UILoader size="small" color="light" />
      </div>
    );
  } else {
    return (
      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {props.slides.map((slide, index) => {
              return (
                <li className="glide__slide slider-frame" key={ index }
                  style={ {
                    backgroundImage: 'url(' + (props.basePath ? props.basePath : '') + slide.headerImage.fullSize.path + ')',
                    backgroundPosition: 'center 45%'
                  } }>
                  <div className="slide-content">
                    <h2>{slide.title}</h2>
                    <p>{slide.excerpt} <a href={ slide.slug }>See the results!</a></p>
                  </div>

                  <div className="slide-overlay" />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
};

UISlider.displayName = 'UISlider';