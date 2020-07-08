import {IProps} from './types';
import React from 'react';
import './UISlider.scss';
import Glide from '@glidejs/glide';

export const UISlider = (props: IProps) => {
  React.useEffect(() => {
    new Glide('.glide').mount();
  }, []);

  return (
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {props.slides.map((slide, index) => {
            return (
              <li className="glide__slide slider-frame" key={ index }
                style={ {
                  backgroundImage: 'url(' + slide.headerImage.fullSize.path + ')',
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
};

UISlider.displayName = 'UISlider';