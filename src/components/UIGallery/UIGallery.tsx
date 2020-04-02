import { ClassList } from '../../@core/DOM/ClassList';
import React from 'react';
import './UIGallery.scss';
import { IProps } from './types';
import { UIIcon } from '../UIIcon';

export const UIGallery = (props: IProps) => {
    const [photos, setPhotos] = React.useState<any | null>(null);
    const [showSlider, setShowSlider] = React.useState<boolean>(false);
    const [sliderReady, setSliderReady] = React.useState<boolean>(false);
    const [currentImage, setCurrentImage] = React.useState<any | null>(null);

    React.useEffect(() => {
        if (currentImage !== null && currentImage !== '') {
            addKeyEventListeners();
            lockBodyScroll(true);
            setShowSlider(true);
        } else {
            lockBodyScroll(false);
            setShowSlider(false);
        }
    }, [currentImage]);

    React.useEffect(() => {
        if (props.gallery) {
            setPhotos(props.gallery.photos);
        }
    }, [props.gallery]);


    const lockBodyScroll = (lock: boolean): void => {
        const body = document.querySelector('body');

        if (body) {
            if (lock) {
                body.classList.add('body--disable-scroll');
            } else {
                body.classList.remove('body--disable-scroll');
            }
        }
    };

    const addKeyEventListeners = (): void => {
        /*if (!currentImage) {
            return;
        }

        const swipe: Swipe = new Swipe('#ui-gallery--current-image');
        const currentIndex = currentImage.index;
        const previousImage = props.baseUrl + photos[currentImage.index - 1].fullSizePath;
        const nextImage = props.baseUrl + photos[currentImage.index + 1].fullSizePath;
        swipe.onLeft(() => {
            if (photos && currentIndex < photos.length - 1) {
                setCurrentImage({source: nextImage, index: currentIndex + 1})
            }
        });
        swipe.onRight(() => {
            if (currentIndex > 0) {
                setCurrentImage({source: previousImage, index: currentIndex - 1})
            }
        });
        swipe.onUp(() => {
        });
        swipe.onDown(() => {
        });
        swipe.run();

        document.addEventListener("keydown", (event) => {
            const currentIndex = currentImage.index;
            const previousImage = props.baseUrl + photos[currentImage.index - 1].fullSizePath;
            const nextImage = props.baseUrl + photos[currentImage.index + 1].fullSizePath;

            if (isWrapperVisible()) {
                if (event.code == 'ArrowLeft') {
                    if (currentIndex > 0) {
                        setCurrentImage({source: previousImage, index: currentIndex - 1})
                    }
                } else if (event.code == 'ArrowRight' && photos) {
                    if (currentIndex < photos.length - 1) {
                        setCurrentImage({source: nextImage, index: currentIndex + 1})
                    }
                }
            }
        });*/

        document.addEventListener('keyup', (e: any) => {
            if (e.key === 'Escape') {
                closeImage();
            }
        });
    };

    const closeImage = () => {
        setCurrentImage(null);
        setSliderReady(false);
        setShowSlider(false);
    };

    const getSliderContent = () => {
        if (showSlider) {
            // const previousImage = props.baseUrl + photos[currentImage.index - 1].fullSizePath;
            // const nextImage = props.baseUrl + photos[currentImage.index + 1].fullSizePath;

            return (
                <>
                    { /* <img alt="Previous Photo" draggable='false' id='ui-gallery--prev-image' src={previousImage}
                         onLoad={(event) => {
                             ClassList.add(event.target, 'loaded');
                         }}/>*/ }

                    <div
                        className={ 'ui-gallery--current-image ' + (sliderReady ? 'ui-gallery--current-image-visible' : '') }>
                        { /*<div className="ui-gallery--loading">
                            <div className="spinner">
                                <div className="double-bounce1"/>
                                <div className="double-bounce2"/>
                            </div>
                        </div>*/ }
                        <img alt="Current Photo" draggable="false" className={ 'loaded' }
                             src={ currentImage && currentImage.source }
                             onLoad={ () => {
                                 setSliderReady(true);
                             } } />
                        { <div className="ui-gallery--close" onClick={ () => {
                            closeImage();
                        } }>
                            <UIIcon icon={ 'close' } size={ 'sm' } />
                        </div> }
                    </div>

                    { /*<img alt="Next Image" draggable='false' id='ui-gallery--next-image' src={nextImage}
                         onLoad={(event) => {
                             ClassList.add(event.target, 'loaded');
                         }}/>*/ }
                </>
            );
        } else {
            return null;
        }
    };

    if (photos) {
        return (
            <>
                <div className={ 'ui-gallery--wrapper ' + (showSlider ? 'ui-gallery--wrapper-visible' : '') }
                     onClick={ (event) => {
                         if (event.target.classList.contains('ui-gallery--wrapper')) {
                             setCurrentImage(null);
                         }
                     } }>
                    { getSliderContent() }
                </div>

                <div className="ui-gallery grid-container grid-two-columns">
                    { photos && photos.map((photo, index) => {
                        return (
                            <div className="grid-item" key={ index }>
                                <img alt={ photo.description }
                                     src={ props.baseUrl + photo.mediumThumbPath }
                                     data-index={ index }
                                     data-large={ props.baseUrl + photo.fullSizePath }
                                     onClick={ (event) => {
                                         const currentImage: string = (event.target as any).getAttribute('data-large');
                                         const currentIndex: number = Number((event.target as any).getAttribute('data-index'));
                                         setCurrentImage({source: currentImage, index: currentIndex});
                                     } }
                                     onLoad={ (event) => {
                                         ClassList.add(event.target, 'loaded');
                                     } }
                                />
                                <p>{ photo.description }</p>
                            </div>
                        );
                    }) }
                </div>
            </>
        );
    } else {
        return (
            <div className="ui-gallery grid-container grid-two-columns">
                { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => {
                    return (
                        <div className="grid-item" key={ index } />
                    );
                }) }
            </div>
        );
    }
};
