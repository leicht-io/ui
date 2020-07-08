import React from 'react';
import './UICard.scss';
import {IProps} from './types';

export const UICard = (props: IProps) => {
  return (
    <div className="ui-card">
      {props.children}
    </div>
  );
};

UICard.displayName = 'UICard';