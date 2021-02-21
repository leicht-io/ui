import {IProps} from './types';
import React, {ReactElement} from 'react';
import './UITextArea.scss';

export const UITextArea = React.memo((props: IProps): ReactElement => {
  const [focus, setFocused] = React.useState<boolean>(false);

  return (
    <div className={ `input-wrap ${focus ? 'input-wrap--focused' : ''}` }>
      <label>{props.label}</label>
      <textarea
        tabIndex={ props.tabIndex || -1 }
        onBlur={ () => {
          setFocused(false);
        } }
        onFocus={ () => {
          setFocused(true);
        } }
        onChange={ (event) => {
          props.onChange(event.target.value);
        } } />
    </div>
  );
});

UITextArea.displayName = 'UITextArea';
