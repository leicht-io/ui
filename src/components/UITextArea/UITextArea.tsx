import {IProps} from './types';
import React, {ReactElement} from 'react';
import './UITextArea.scss';

export const UITextArea = React.memo((props: IProps): ReactElement => {
  return (
    <div className="input-wrap">
      <label>{ props.label }</label>
      <textarea onChange={ (event) => {
        props.onChange(event.target.value);
      } } />
    </div>
  );
});

UITextArea.displayName = 'UITextArea';
