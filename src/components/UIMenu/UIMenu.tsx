import React from 'react';
import './UIMenu.scss';
import { IProps, MenuItem } from './types';
import { UIIcon } from '../UIIcon';

export const UIMenu = (props: IProps) => {
    /*const xDown: any = null;
    const yDown: any = null;
    const xDiff: any = null;
    const yDiff: any = null;
    const timeDown: any = null;
    const startEl: any = null;
    const timer: any = null;
    const throttleDelay: number = 100;
    const last: any = null;
    const initialLoad = true;*/

    const [scrollActive, setScrollActive] = React.useState<boolean>(false);

    React.useEffect(() => {
        document.addEventListener('scroll', () => {
            throttleScroll();
        }, true);
    }, []);

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    /*const addCustomEvent = (): void => {
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
        requestAnimationFrame(() => {
            const wrapper: any = document.querySelector('.nav-wrapper');

            if (wrapper !== null) {
                if (initialLoad && window.pageYOffset > 0) {
                    wrapper.classList.add('disable-animations');

                    handleScrollClasses(true);
                    toggleMenuChevrons(false);
                    toggleHamburger(true);

                    wrapper.classList.add('nav-wrapper--active');

                } else {
                    wrapper.classList.remove('disable-animations');
                }
            }
            initialLoad = false;
        });
    };

    const setActiveLinkItem = (): void => {
        const anchors: NodeListOf<Element> = document.querySelectorAll('.nav-wrapper a');
        const pathName = document.location.pathname.split('/')[1];

        for (let i = 0; i < anchors.length; i++) {
            const anchor: Element = anchors.item(i);
            const attribute: string | null = anchor.getAttribute('href');
            if (anchor && anchor.parentElement && attribute && attribute.split('/')[1] === pathName) {
                anchor.parentElement.classList.add('active');
            }
        }
    };

    const setListeners = (): void => {
        setTouchListeners();
        setClickListeners();
        setScrollListeners();
    };

    const setScrollListeners = (): void => {
        window.addEventListener('scroll', () => {
            throttle();
        }, true);
    };

    const setTouchListeners = (): void => {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);

        document.addEventListener('swiped-left', () => {
            toggleMenu(false);
        });
    };

    const setClickListeners = (): void => {
        const hamburger: any = document.querySelector('.nav-hamburger');
        const navBackground: any = document.querySelector('.nav-background');
        const dropDownButtons = document.querySelectorAll('.nav-sub-btn');
        const closeBtn: any = document.querySelector('.nav-responsive-header .ui-i--close');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                toggleMenu(true);
            });
        }

        if (navBackground) {
            navBackground.addEventListener('click', () => {
                toggleMenu(false);
            });
        }

        for (let i = 0; i < dropDownButtons.length; i++) {
            const button: Element = dropDownButtons.item(i);

            button.addEventListener('click', (event: any) => {
                const subContent: any = event.target.parentElement.querySelector('.nav-sub-content');

                if (subContent.classList.contains('nav-sub-content-active')) {
                    subContent.classList.remove('nav-sub-content-active');
                } else {
                    for (let q = 0; q < dropDownButtons.length; q++) {
                        const subParent: any = dropDownButtons[q].parentElement;
                        subParent.getElementsByClassName('nav-sub-content')[0].classList.remove('nav-sub-content-active');
                    }

                    subContent.classList.add('nav-sub-content-active');
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                toggleMenu(false);
            });
        }
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

    const toggleMenuChevrons = (add: boolean): void => {
        const menuIcons: NodeListOf<Element> = document.querySelectorAll('.nav-wrapper .ui-i--chevron-down');

        for (let i = 0; i < menuIcons.length; i++) {
            const icon: Element = menuIcons.item(i);

            if (add) {
                icon.classList.add('ui-i--white');
                icon.classList.remove('ui-i--gray');
            } else {
                icon.classList.remove('ui-i--white');
                icon.classList.add('ui-i-gray');
            }
        }
    };

    const toggleHamburger = (dark: boolean): void => {
        const hamburgers: NodeListOf<Element> = document.querySelectorAll('.nav-wrapper .ui-i--hamburger');

        for (let i = 0; i < hamburgers.length; i++) {
            const hamburger: Element = hamburgers.item(i);
            if (dark) {
                hamburger.classList.remove('ui-i--white');
                hamburger.classList.remove('ui-i--gray');
            } else {
                hamburger.classList.remove('ui-i--gray');
                hamburger.classList.add('ui-i--white');
            }
        }
    };


    const handleScrollClasses = (showOriginal: boolean): void => {
        const header = getHeaderElement();

        if (!header) {
            return;
        }

        if (!showOriginal) {
            header.classList.add('nav-wrapper--active');
        } else {
            header.classList.remove('nav-wrapper--active');
        }
    };
*/
    const getHeaderElement = () => {
        return document.querySelector('.nav-wrapper');
    };

    const throttleScroll = () => {
//        const now = +new Date();
//        if (last && now < last + throttleDelay) {
//            clearTimeout(timer);
//            timer = setTimeout(() => {
//                last = now;
        onScroll();
//            }, throttleDelay);
//        } else {
//            last = now;
//            onScroll();
//        }
    };

    const onScroll = () => {
        /*const wrapper: HTMLElement | null = document.querySelector('.nav-wrapper');
        if (wrapper) {
            wrapper.classList.remove('disable-animations');
        }*/

        const header = getHeaderElement();

        if (header && window.pageYOffset && !scrollActive) {
            // handleScrollClasses(false);
            // toggleMenuChevrons(false);
            // toggleHamburger(true);
            if (!scrollActive) {
                setScrollActive(true);
            }
        } else if (window.pageYOffset === 0) {
                setScrollActive(false);
            // handleScrollClasses(true);
            // toggleMenuChevrons(true);
            // toggleHamburger(false);
        }
    };
    /*
        const handleTouchEnd = (e) => {
            if (startEl !== e.target) return;

            const swipeThreshold = parseInt(startEl.getAttribute('data-swipe-threshold') || '20', 10);    // default 10px
            const swipeTimeout = parseInt(startEl.getAttribute('data-swipe-timeout') || '500', 10);      // default 1000ms
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
    */

    // addCustomEvent();
//     handleInitialLoad();
//     setActiveLinkItem();
//     setListeners();

    const getMenuItem = (menuItem: MenuItem) => {
        if (menuItem.menuItems && menuItem.menuItems.length > 0) {
            return (
                <>
                    <span className="nav-sub-btn">{ menuItem.title }
                        <UIIcon icon={ 'chevronDown' } color={ 'white' } />
                    </span>
                    <div className="nav-sub-content">
                        { menuItem.menuItems && menuItem.menuItems.map((menuItem, index) => {
                            return (
                                <a key={ index }
                                   onClick={ () => {
                                       // TODO: navigate
                                       // menuItem.link;
                                   } }>{ menuItem.title }</a>
                            );
                        }) }
                    </div>
                </>
            );
        } else if (menuItem.button) {
            return (
                <div className="nav-item nav-item--primary">
                    <a href={ menuItem.link }>{ menuItem.title }</a>
                </div>
            );
        } else {
            return (
                <a href={ menuItem.link }>{ menuItem.title }</a>
            );
        }
    };

    return (
        <div
            className={ 'nav-wrapper nav-wrapper--fixed nav-wrapper-transparent ' + (scrollActive ? 'nav-wrapper--active' : '') }>
            <div className="nav-container">
                <div className="nav-hamburger">
                    <UIIcon icon={ 'hamburger' } color={ 'white' } />
                </div>

                <div className="logo">
                    <a href="/">
                        { props.logo }
                    </a>
                </div>

                <div className="nav-background" />

                <nav className="nav">
                    <div className="nav-responsive-header">
                        { props.logo }

                        <div className="nav-hamburger">
                            <UIIcon icon={ 'close' } color={ 'grey' } />
                        </div>
                    </div>
                    <div className="nav-content">
                        { props.menuItems.map((menuItem, index) => {
                            return (
                                <div
                                    className={ 'nav-item ' + ((menuItem.menuItems && menuItem.menuItems.length > 0) ? 'nav-sub' : '') }
                                    key={ index }>
                                    { getMenuItem(menuItem) }
                                </div>
                            );
                        }) }
                    </div>
                </nav>
            </div>
        </div>
    );
};
