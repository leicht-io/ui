import {IProps} from './types';
import React, {ReactElement} from 'react';
import './UIInput.scss';

export const UIInput = (props: IProps): ReactElement => {
  return (
    <div className="input-wrap">
      <label>{ props.label }</label>
      <input type={ 'text' } onChange={ (event) => {
        props.onChange(event.target.value);
      } } />
    </div>
  );
};

UIInput.displayName = 'UIInput';