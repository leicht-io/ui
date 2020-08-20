import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UICardBody.scss';

export const UICardBody = (props: IProps): ReactElement => {
  return <div className="ui-card-body">
    { props.children }
  </div>;
};

UICardBody.displayName = 'UICardBody';