import {IProps} from './types';
import React, {ReactElement} from 'react';
import {UITypography} from '../UITypography';
import './UICard.scss';

export const UICard = (props: IProps): ReactElement => {
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
      src={ props.backgroundUrl || undefined }
      onLoad={ () => {
        setLoaded(true);
      } } />;
  };

  const getLabel = () => {
    if (props.hideTitle) {
      return;
    }

    return (
      <div className={ 'ui-img-label-wrapper' }>
        <div
          className={ 'ui-img-label' + (props.titleAlignment ? ' ui-img-label--' + props.titleAlignment : '') }>
          <UITypography type="p"
            skeleton={ !props.title }>{props.title ? props.title : ''}</UITypography>
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
      {props.children && props.children}
    </div>
  );
};

UICard.displayName = 'UICard';
