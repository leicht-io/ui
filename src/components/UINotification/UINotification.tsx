import React from 'react';
import { IProps } from './types';
import './UINotifications.scss';
import { UITypography } from '../UITypography';

export const UINotification = (props: IProps) => {
    return (
        <div className={ 'notification notification--' + props.type }>
            <UITypography type={ 'p' }><strong>{ props.title }</strong> { props.description }</UITypography>
        </div>
    );
};