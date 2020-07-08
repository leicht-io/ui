import React from 'react';
import {IProps} from './types';
import './UICardBody.scss';

export const UICardBody = (props: IProps) => {
  return <div className="ui-card-body">
    { props.children }
  </div>;
};

UICardBody.displayName = 'UICardBody';