import {IProps} from './types';
import React, {ReactElement} from 'react';
import './UIInput.scss';

export const UIInput = (props: IProps): ReactElement => {
  const [focus, setFocused] = React.useState<boolean>(false);

  return (
    <div className={ `input-wrap ${focus ? 'input-wrap--focused' : ''}` }>
      <label>{props.label}</label>
      <input
        tabIndex={ props.tabIndex || -1 }
        onBlur={ () => {
          setFocused(false);
        } }
        onFocus={ () => {
          setFocused(true);
        } }
        type={ 'text' }
        onChange={ (event) => {
          props.onChange(event.target.value);
        } } />
    </div>
  );
};

UIInput.displayName = 'UIInput';
