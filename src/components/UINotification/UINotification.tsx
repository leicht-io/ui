import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UINotification.scss';
import {UITypography} from '../UITypography';

export const UINotification = React.memo((props: IProps): ReactElement => {
  const [render, setRender] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setRender(false);
    }, 150);
  }, []);

  const getClasses = (): string => {
    return `notification notification--${props.type} ${render ? 'notification--rendering' : 'notification--visible'}`;
  };

  return (
    <div className={ getClasses() }>
      <UITypography type={ 'p' }><strong>{props.title}</strong> {props.description}</UITypography>
    </div>
  );
});

UINotification.displayName = 'UINotification';
