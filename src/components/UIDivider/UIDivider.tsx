import React from "react";
import {IProps} from "./types";
import "./UIDivider.scss"

export const UIDivider = (props: IProps) => {
    const getClasses = (): string => {
        return "divider " + (props.size ? ' divider-' + props.size : '') + (props.border ? " divider-border" : "")
    };

    return (
        <div
            className={getClasses()}/>
    );
};