import React from "react";
import {IProps} from "./types";
import "./UIDivider.scss"

export const UIDivider = (props: IProps) => {
    return (
        <div
            className={"divider " + props.size ? ' divider-' + props.size : '' + props.border ? " divider-border" : ""}/>
    );
};