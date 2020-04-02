import { IProps } from './types';
import './UIIcon.scss';
import React from 'react';

export const UIIcon = (props: IProps) => {
    return (<div
        className={ 'ui-i ui-i--' + (props.size ? props.size : 'sm') + ' ui-i--' + props.icon + (props.color ? ' ui-i--' + props.color : '') } />);
};
