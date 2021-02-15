import React, {ReactElement} from 'react';
import './UITags.scss';
import {IProps} from './types';

export const UITags = React.memo((props: IProps): ReactElement => {
  const getTags = () => {
    return props.tags.map((tag, index) => {
      return <div key={ index } className={ 'ui-tag ui-tag--' + tag.type }>
        { tag.name }
      </div>;
    });
  };

  return (
    <div className="ui-tags">
      { getTags() }
    </div>
  );
});

UITags.displayName = 'UITags';
