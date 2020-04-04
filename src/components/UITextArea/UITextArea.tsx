import { IProps } from './types';
import React from 'react';
import './UITextArea.scss';

export const UITextArea = (props: IProps) => {
    return (
        <div className="input-wrap">
            <label>{ props.label }</label>
            <textarea onChange={ (event) => {
                props.onChange(event.target.value);
            } } />
        </div>
    );
};
