import {IProps} from './types';
import React, {ReactElement} from 'react';
import './UISlider.scss';
import Glide from '@glidejs/glide';
import {UILoader} from '../UILoader';

// TODO: Use React intrgration of Glide,
export const UISlider = (props: IProps): ReactElement => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const [slider]: Glide = React.useState<Glide>(new Glide('.glide', {
    startAt: 0,
    hoverPause: true,
    type: 'carousel'
  }));

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return () => slider.destroy();
  }, []);

  React.useEffect(() => {
    if (props.slides) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
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
