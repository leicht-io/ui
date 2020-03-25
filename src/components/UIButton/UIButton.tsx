import React from "react";
import {IProps} from "./types";
import "./UIButton.scss"

export const UIButton = (props: IProps) => {
    return (<button onclick={props.onClick} className={"btn btn--" + props.type}>{props.text}</button>);
};