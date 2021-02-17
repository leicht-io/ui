import React, {ReactElement} from 'react';
import {IProps} from './types';
import './UITyphography.scss';

export const UITypography = React.memo((props: IProps): ReactElement => {
  const [classes, setClasses] = React.useState<string>('');

  React.useEffect(() => {
    let tempClasses = 'ui-typography';
    if (props.fontWeight) {
      tempClasses += ` ui-typography--fw${props.fontWeight}`;
    }
    if (props.skeleton) {
      tempClasses += ' ui-typography--skeleton';
    }
    setClasses(tempClasses);
  }, [props.skeleton, props.fontWeight]);

  switch (props.type) {
    case 'a':
      return <a className={ classes }>{props.children}</a>;
    case 'h1':
      return <h1 className={ classes }>{props.children}</h1>;
    case 'h2':
      return <h2 className={ classes }>{props.children}</h2>;
    case 'h3':
      return <h3 className={ classes }>{props.children}</h3>;
    case 'h4':
      return <h4 className={ classes }>{props.children}</h4>;
    case 'h5':
      return <h5 className={ classes }>{props.children}</h5>;
    case 'h6':
      return <h6 className={ classes }>{props.children}</h6>;
    case 'p':
      return <p className={ classes }>{props.children}</p>;
  }
});

UITypography.displayName = 'UITypography';
