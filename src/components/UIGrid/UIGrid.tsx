import React from "react";
import "./UIGrid.scss";
import {IProps} from "./types";

export const UIGrid = (props: IProps) => {
    return (
        <div className={"grid-container grid-" + props.columns + "-columns"}>
            {props.children}
        </div>
    );
};