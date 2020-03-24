import React from "react";
import {IProps} from "./types";
import "./UINotifications.scss";

export const UINotification = (props: IProps) => {
    return (
        <div className={"notification notification--" + props.type}>
            <p><strong>{props.title}</strong> {props.description}</p>
        </div>
    );
};