import React from 'react';
import './UIProgress.scss';

export const UIProgress = () => {
    let windowHeight: number = 0;
    let documentHeight: number = 0;
    const progressBar = React.useRef();

    React.useEffect(() => {
        calculateProgress();
    });

    const calculateProgress = (): void => {
        windowHeight = window.innerHeight;
        documentHeight = document.documentElement.scrollHeight;

        setMax();
        setProgress();
    };

    const setProgress = (): void => {
        if (!progressBar) {
            return;
        }

        progressBar.current.setAttribute('value', window.pageYOffset.toString());
    };

    const setMax = (): void => {
        if (!progressBar) {
            return;
        }

        const max: number = documentHeight - windowHeight;

        progressBar.current.setAttribute('max', max.toString());
    };

    window.addEventListener('scroll', () => {
        setProgress();
    });

    const container = document.querySelector('.page-container');
    // @ts-ignore
    if (container && typeof ResizeObserver === 'function') {
        // @ts-ignore
        new ResizeObserver(entries => {
            calculateProgress();
        }).observe(container);
    }

    return (
        <progress className="ui-reading-position-indicator" value="0" ref={ progressBar } />
    );
};
