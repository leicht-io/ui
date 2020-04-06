import React from 'react';
import { UITypography } from '../../UITypography';
import { IProps } from './types';
import './UICardTitle.scss';

export const UICardTitle = (props: IProps) => {
    return (
        <div className={ 'ui-card-title ' + (props.asOverlay ? 'ui-card-title-as-overlay' : '') }>
            <UITypography type={ 'h4' }>{ props.title }</UITypography>
        </div>
    );
};
