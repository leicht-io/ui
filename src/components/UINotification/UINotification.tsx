import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UINotification.scss';
import {UITypography} from '../UITypography';

export const UINotification = React.memo((props: IProps): ReactElement => {
  return (
    <div className={ 'notification notification--' + props.type }>
      <UITypography type={ 'p' }><strong>{props.title}</strong> {props.description}</UITypography>
    </div>
  );
});

UINotification.displayName = 'UINotification';
