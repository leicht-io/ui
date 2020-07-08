import React from 'react';
import {IProps} from './types';
import './UIModal.scss';
import {UIIcon} from '../UIIcon';

export const UIModal = (props: IProps) => {
  const keyDownCallback = (event) => handleKeyDown(event);

  React.useEffect(() => {
    addEventListeners();
  }, []);

  React.useEffect(() => {
    if (props.show) {
      toggleBodyScrollLock(true);
    } else {
      toggleBodyScrollLock(false);
    }
  }, [props.show]);

  const toggleBodyScrollLock = (lock: boolean): void => {
    const body: HTMLElement | null = document.querySelector('body');

    if (body) {
      if (lock) {
        body.classList.add('body--disable-scroll');
      } else {
        body.classList.remove('body--disable-scroll');
      }
    }
  };

  const addEventListeners = (): void => {
    document.addEventListener('keydown', keyDownCallback);
  };

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && props.onHide) {
      props.onHide();
    }
  };

  if (props.show) {
    if (props.type === 'IFRAME') {
      return (
        <div className="ui-modal--container ui-modal--container-with-iframe ui-modal--container--visible"
          onClick={ (event) => {
            if ((event.target as HTMLInputElement).classList.contains('ui-modal--container') && props.onHide) {
              props.onHide();
            }
          } }>
          <div className="ui-modal--wrapper">
            <div className="ui-modal--title-wrapper">
              <div className="ui-modal--title"><h5>{ props.title }</h5></div>
              <div className="ui-modal--buttons">
                <div className="ui-modal--buttons-close" onClick={ () => {
                  if (props.onHide) {
                    props.onHide();
                  }
                } }><UIIcon icon={ 'close' } /></div>
              </div>
            </div>
            <div className="ui-modal--content--wrapper">
              <div className="ui-modal--content">
                <iframe src={ props.iframeUrl } />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="ui-modal--container ui-modal--container-with-html ui-modal--container--visible"
          onClick={ (event) => {
            if ((event.target as HTMLInputElement).classList.contains('ui-modal--container') && props.onHide) {
              props.onHide();
            }
          } }>
          <div className="ui-modal--wrapper">
            <div className="ui-modal--title-wrapper">
              <div className="ui-modal--title"><h5>{ props.title }</h5></div>
              <div className="ui-modal--buttons">
                <div className="ui-modal--buttons-close" onClick={ () => {
                  if (props.onHide) {
                    props.onHide();
                  }
                } }><UIIcon icon={ 'close' } /></div>
              </div>
            </div>
            <div className="ui-modal--content--wrapper">
              <div className="ui-modal--content">{ props.children }</div>
            </div>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
};

UIModal.displayName = 'UIModal';