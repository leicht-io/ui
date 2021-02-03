import React, {ReactElement} from 'react';
import './UIPageContainer.scss';
import {Types} from './types';

export const UIPageContainer = (props: Types): ReactElement => {
  return (
    <div className="ui-page-container">
      {props.children}
    </div>
  );
};

UIPageContainer.displayName = 'UIPageContainer';
