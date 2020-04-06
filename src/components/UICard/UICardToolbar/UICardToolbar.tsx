import React from 'react';
import { IProps } from './types';
import './UICardToolbar.scss';
import { UITypography } from '../../UITypography';
import { UIIcon } from '../../UIIcon';

export const UICardToolbar = (props: IProps) => {
    return (
        <div className="ui-card-toolbar">
            <UITypography type={ 'p' }>{ props.text }</UITypography>

            <div className="ui-icons">
                { props.icons && props.icons.map((icon, index) => {
                    return (
                        <div key={ index } onClick={ () => {
                            icon.onClick();
                        } }>
                            <UIIcon icon={ icon.id } color="white" />
                        </div>
                    );
                }) }
            </div>
        </div>
    );
};
