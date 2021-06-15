import * as React from "react";
import {UIHeader, UIPageContainer, UITypography} from "../../../../src";

export const Typography = (): React.ReactElement => {
    const [text, setText] = React.useState<string | null>(null);

    React.useEffect(() => {
        setTimeout(() => {
            setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum            dolore eu fugiat            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia            deserunt mollit            anim id est laborum.")
        }, 2500);
    }, []);

    return (
        <>
            <UIHeader
                title={{value: "Typography", skeleton: true}}
                imageUrl="https://leicht.io//assets/images/header-7.7f48e486decb2b9246586c0f33d03c942e25dcb23bb5f5d33dff9876f59ca2f9.jpg"/>
            <UIPageContainer>
                <UITypography type={'h3'}>Typography</UITypography>
                <UITypography type={'h1'}>Heading 1</UITypography>
                <UITypography type={'h2'}>Heading 2</UITypography>
                <UITypography type={'h3'}>Heading 3</UITypography>
                <UITypography type={'h4'}>Heading 4</UITypography>
                <UITypography type={'h5'}>Heading 5</UITypography>
                <UITypography type={'h6'}>Heading 6</UITypography>
                <UITypography type={'p'} skeleton={!text}>{text}</UITypography>
                <UITypography type={'p'}>Lorem upsim with an <a href="#">anchor</a>.</UITypography>
            </UIPageContainer>
        </>
    );
}
