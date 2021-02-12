import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UIDivider.scss';

export const UIDivider = React.memo((props: IProps): ReactElement => {
  const getClasses = (): string => {
    return 'divider ' + (props.size ? ' divider-' + props.size : '') + (props.showBorder ? ' divider-border' : '');
  };

  return (
    <div className={ getClasses() } />
  );
});

UIDivider.displayName = 'UIDivider';
