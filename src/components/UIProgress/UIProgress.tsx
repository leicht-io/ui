import React from "react";
import {QuerySelector} from "../../@core/DOM/QuerySelector";
import {Attribute} from "../../@core/DOM/models/Attribute";
import {Event} from "../../@core/DOM/models/Event";
import "./UIProgress.scss";

export const UIProgress = () => {
    let windowHeight: number = 0;
    let documentHeight: number = 0;
    let progressBar: HTMLElement | null = null;

    React.useEffect(() => {
        requestAnimationFrame(() => {
            calculateDimensions();
        });
    });

    const calculateDimensions = (): void => {
        windowHeight = window.innerHeight;
        documentHeight = document.documentElement.scrollHeight;
        progressBar = QuerySelector.get("progress.ui-reading-position-indicator");

        setMax();
    };

    const setProgress = (): void => {
        if (!progressBar) {
            return;
        }

        progressBar.setAttribute(Attribute.VALUE, window.pageYOffset.toString());
    };

    const setMax = (): void => {
        if (!progressBar) {
            return;
        }

        const max: number = documentHeight - windowHeight;

        progressBar.setAttribute(Attribute.MAX, max.toString());
    };

    requestAnimationFrame(() => {
        setProgress();
    });

    window.addEventListener(Event.SCROLL, () => {
        setProgress();
    });

    const container = document.querySelector('.page-container');
    // @ts-ignore
    if (container && typeof ResizeObserver === "function") {
        // @ts-ignore
        new ResizeObserver(entries => {
            calculateDimensions();
        }).observe(container);
    }

    return (
        <progress className="ui-reading-position-indicator" value="0"/>
    );
};