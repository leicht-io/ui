import {IProps} from './types';
import React, {ReactElement} from 'react';
import {UITypography} from '../UITypography';
import './UIImage.scss';

export const UIImage = (props: IProps): ReactElement => {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const getImage = () => {
    return <img
      style={ {
        height: props.skeletonHeight,
        width: props.width ? props.width : '100%',
      } }
      className={ 'ui-img' }
      alt={ props.alt ? props.alt : '' }
      width={ props.width ? props.width : '' }
      height={ props.height ? props.height : '' }
      src={ props.source || undefined }
      onLoad={ () => {
        setLoaded(true);
      } } />;
  };

  const getLabel = () => {
    if (!props.label) {
      return;
    }

    return (
      <div className={ 'ui-img-label-wrapper' }>
        <div className="ui-img-label">
          <UITypography type="p"
            skeleton={ props.label && (!props.label.text || props.label.text === '') }>{props.label ? props.label.text : ''}</UITypography>
        </div>
      </div>
    );
  };

  return (
    <div
      className={ 'ui-image ' + (!loaded ? 'ui-image-loading ' : 'ui-image-loaded ') + (props.onClick ? 'ui-image-pointer ' : '') + (props.round ? 'ui-img-round ' : '') + (props.responsive ? 'ui-img-responsive ' : '') }
      style={ {height: props.height} }
      onClick={ () => {
        if (props.onClick) {
          props.onClick();
        }
      } }>
      {getImage()}
      {getLabel()}
    </div>
  );
};

UIImage.displayName = 'UIImage';
