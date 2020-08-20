import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UIButton.scss';

export const UIButton = (props: IProps): ReactElement => {
  return (
    <button onClick={ props.onClick } className={ 'btn btn--' + props.type }>
      {props.text || props.children}
    </button>
  );
};

UIButton.displayName = 'UIButton';