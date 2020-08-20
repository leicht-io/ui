import React, {ReactElement} from 'react';
import './UICard.scss';
import {IProps} from './types';

export const UICard = (props: IProps): ReactElement => {
  return (
    <div className="ui-card">
      {props.children}
    </div>
  );
};

UICard.displayName = 'UICard';