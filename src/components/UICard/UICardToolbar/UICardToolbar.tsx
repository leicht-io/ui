import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UICardToolbar.scss';
import {UIIcon} from '../../UIIcon';

export const UICardToolbar = (props: IProps): ReactElement => {
  return (
    <div className={ 'ui-card-toolbar' }>
      <div className="ui-icons">
        {props.icons && props.icons.map((icon, index) => {
          return (
            <UIIcon
              icon={ icon.id }
              key={ index }
              onClick={ () => {
                icon.onClick();
              } } />
          );
        })}
      </div>
    </div>
  );
};

UICardToolbar.displayName = 'UICardToolbar';
