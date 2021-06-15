import * as React from "react";
import {IMenuItem, UIMenu, UIProgress} from "../../../../src";
import {logo} from "../../../assets/logo";
import {MenuMock} from "../../../assets/menuMock";
import {useHistory} from "react-router-dom";

export const Root = (props: { children: any }): React.ReactElement => {
    const history = useHistory();

    const [menuItems] = React.useState<IMenuItem[]>(MenuMock);

    return (
        <>
            <UIProgress/>
            <UIMenu
                menuItems={menuItems}
                logo={logo}
                onNavigate={(destination: IMenuItem) => {
                    history.push(destination.link as any);
                }}
            />

            {props.children}
        </>
    );
}
