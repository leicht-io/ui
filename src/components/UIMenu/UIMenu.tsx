import React from 'react';
import './UIMenu.scss';
import {IProps, MenuItem} from './types';
import {UIIcon} from '../UIIcon';

export const UIMenu = (props: IProps) => {
  let xDown: any = null;
  let yDown: any = null;
  let xDiff: any = null;
  let yDiff: any = null;
  let timeDown: any = null;
  let startEl: any = null;
  let timer: any = null;
  let last: any = null;

  const throttleDelay: number = 100;

  const [scrollActive, setScrollActive] = React.useState<boolean>(false);
  const [showSidebar, setShowSidebar] = React.useState<boolean>(false);
  const [disableAnimations, setDisableAnimations] = React.useState<boolean>(false);

  React.useEffect(() => {
    toggleMenu(showSidebar);
  }, [showSidebar]);

  React.useEffect(() => {
    if (window.pageYOffset > 0) {
      setScrollActive(true);
      setDisableAnimations(true);
    }
    handleInitialLoad();
    addCustomEvent();
    setTouchListeners();
    document.addEventListener('keyup', (e: any) => {
      if (e.key === 'Escape') {
        setShowSidebar(false);
      }
    });
  }, []);

  // patch CustomEvent to allow constructor creation (IE/Chrome)
  const addCustomEvent = (): void => {
    if (typeof (window as any).CustomEvent !== 'function') {
      (window as any).CustomEvent = (event, params) => {
        params = params || {bubbles: false, cancelable: false, detail: undefined};
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      };

      (window as any).CustomEvent.prototype = (window as any).Event.prototype;
    }
  };

  const handleInitialLoad = (): void => {
    document.addEventListener('scroll', () => {
      throttleScroll();
    }, true);
  };

  const setTouchListeners = (): void => {
    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    document.addEventListener('swiped-left', () => {
      setShowSidebar(false);
    });
  };

  const toggleMenu = (shouldOpen: boolean): void => {
    const body: any = document.body;
    const nav: any = document.querySelector('.nav');
    const navBackground: any = document.querySelector('.nav-background');

    if (shouldOpen && nav && nav.style.display !== 'block') {
      nav.classList.add('nav-active');
      navBackground.classList.add('nav-background-active');
      body.classList.add('nav--disable-scroll');

      return;
    }

    nav.classList.remove('nav-active');
    navBackground.classList.remove('nav-background-active');
    body.classList.remove('nav--disable-scroll');
  };

  const getHeaderElement = () => {
    return document.querySelector('.ui-navigation');
  };

  const throttleScroll = () => {
    const now = +new Date();
    if (last && now < last + throttleDelay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        last = now;
        onScroll();
        setDisableAnimations(false);
      }, throttleDelay);
    } else {
      last = now;
      onScroll();
    }
  };

  const onScroll = () => {
    const header = getHeaderElement();

    if (header && window.pageYOffset && !scrollActive) {
      if (!scrollActive) {
        setScrollActive(true);
      }
    } else if (window.pageYOffset === 0) {
      setScrollActive(false);
    }
  };

  const handleTouchEnd = (e) => {
    if (startEl !== e.target) return;

    const swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10); // default 10px
    const swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10); // default 1000ms
    const timeDiff = Date.now() - timeDown;
    let eventType = '';

    if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
      if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (xDiff > 0) {
          eventType = 'swiped-left';
        } else {
          eventType = 'swiped-right';
        }
      }
    } else {
      if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
        if (yDiff > 0) {
          eventType = 'swiped-up';
        } else {
          eventType = 'swiped-down';
        }
      }
    }

    if (eventType !== '') {
      startEl.dispatchEvent(new CustomEvent(eventType, {bubbles: true, cancelable: true})); // fire event on the element that started the swipe
    }

    xDown = null;
    yDown = null;
    timeDown = null;
  };

  const handleTouchStart = (e) => {
    if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

    startEl = e.target;
    timeDown = Date.now();
    xDown = e.touches[0].clientX;
    yDown = e.touches[0].clientY;
    xDiff = 0;
    yDiff = 0;
  };

  const handleTouchMove = (e) => {
    if (!xDown || !yDown) return;

    const xUp = e.touches[0].clientX;
    const yUp = e.touches[0].clientY;
    xDiff = xDown - xUp;
    yDiff = yDown - yUp;
  };

  const getMenuItem = (menuItem: MenuItem) => {
    if (menuItem.menuItems && menuItem.menuItems.length > 0) {
      return (
        <>
          <span className="nav-sub-btn" onClick={ (event: any) => {
            if (showSidebar) {
              const sibling = event.target.parentElement.querySelector('.nav-sub-content');
              if (sibling.classList.contains('nav-sub-content--expanded')) {
                sibling.classList.remove('nav-sub-content--expanded');
              } else {
                sibling.classList.add('nav-sub-content--expanded');
              }
            }
          } }>
            {menuItem.title}
            <UIIcon icon={ 'chevronDown' } color={ showSidebar ? 'grey' : 'white' } />
          </span>
          <div
            className={ 'nav-sub-content' }>
            {menuItem.menuItems && menuItem.menuItems.map((menuItem, index) => {
              return (
                <a key={ index }
                  className={ (menuItem.active ? ' active' : '') }
                  onClick={ (event) => {
                    handleClick(event, menuItem);
                  } }>{menuItem.title}</a>
              );
            })}
          </div>
        </>
      );
    } else if (menuItem.button) {
      return (
        <a onClick={ (event) => {
          handleClick(event, menuItem);
        } }>{menuItem.title}</a>
      );
    } else {
      return (
        <a href={ menuItem.link } onClick={ (event) => {
          handleClick(event, menuItem);
        } }>{menuItem.title}</a>
      );
    }
  };

  const handleClick = (event: any, menuItem: MenuItem) => {
    event.preventDefault();

    props.onNavigate(menuItem);
  };

  const hasActiveChildren = (menuItem: MenuItem) => {
    let hasActiveChildren: boolean = false;

    if (menuItem.menuItems) {
      menuItem.menuItems.forEach((menuItem: MenuItem) => {
        if (menuItem.active) {
          hasActiveChildren = true;
        }
      });
    }

    return hasActiveChildren;
  };

  return (
    <div
      className={ 'ui-navigation ' + (scrollActive ? 'nav-wrapper--active' : '') + (disableAnimations ? ' disable-animations' : '') + (showSidebar ? ' sidebar-visible' : '') }>
      <div className="nav-container">
        <div className="nav-hamburger" onClick={ () => {
          setShowSidebar(true);
        } }>
          <UIIcon icon={ 'hamburger' } color={ scrollActive ? 'grey' : 'white' } size={ 'md' } />
        </div>

        <div className="logo">
          <a onClick={ (event) => {
            handleClick(event, {title: 'Home', link: '/'});
          } }>
            {props.logo}
          </a>
        </div>

        <div className="nav-background" onClick={ () => {
          if (showSidebar) {
            setShowSidebar(false);
          }
        } } />

        <nav className="nav">
          <div className="nav-responsive-header">
            {props.logo}

            <div className="nav-hamburger" onClick={ () => {
              setShowSidebar(false);
            } }>
              <UIIcon icon={ 'close' } color={ 'grey' } />
            </div>
          </div>
          <div className="nav-content">
            {props.menuItems.map((menuItem, index) => {
              return (
                <div
                  className={ 'nav-item ' + ((menuItem.menuItems && menuItem.menuItems.length > 0) ? 'nav-sub' : '') + (menuItem.active || hasActiveChildren(menuItem) ? ' active' : '') + (menuItem.button ? ' nav-item--primary' : '') }
                  key={ index }>
                  {getMenuItem(menuItem)}
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

UIMenu.displayName = 'UIMenu';