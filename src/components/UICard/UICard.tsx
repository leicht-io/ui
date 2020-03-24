import React from "react";
import "./UICard.scss";
import {IProps} from "./types";

export const UICard = (props: IProps) => {
    return (
        <div className="ui-card">
            <div className="ui-card--title">{props.title}</div>
            <div className="ui-card--content">
                {props.children}
            </div>
        </div>
    );
};