import React, {ReactElement} from 'react';
import './UIPageContainer.scss';

export const UIPageContainer = (props: any): ReactElement => {
  return (
    <div className="ui-page-container">
      {props.children}
    </div>
  );
};

UIPageContainer.displayName = 'UIPageContainer';
