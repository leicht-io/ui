import {IProps} from "./types";
import "./UIIcon.scss"
import React from "react";

export const UIIcon = (props: IProps) => {
    return (<div className={"ui-i ui-i--lg ui-i--" + props.icon}/>);
};
