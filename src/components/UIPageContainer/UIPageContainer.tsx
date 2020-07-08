import React from 'react';
import './UIPageContainer.scss';

export const UIPageContainer = (props: any) => {
  return (
    <div className="ui-page-container">
      {props.children}
    </div>
  );
};

UIPageContainer.displayName = 'UIPageContainer';
