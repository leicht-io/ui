import React from 'react';
import './UIPageContainer.scss';

export const UIPageContainer = (props: any) => {
    return (
        <div className="page-container">
            { props.children }
        </div>
    );
};
