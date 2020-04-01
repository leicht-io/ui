import React from "react";
import {
    UIDivider,
    UIGallery,
    UIHeader,
    UIIcon,
    UIMenu,
    UIPageContainer,
    UIProgress,
    UITags
} from "../../src/components";
import {UINotification} from "../../src/components/UINotification";
import {UICard} from "../../src/components/UICard";
import {UIGrid} from "../../src/components/UIGrid";
import {UITypography} from "../../src/components/UITypography";
import {UIButton} from "../../src/components/UIButton";
import {galleryMockResponse} from "../assets/gallery.mock";

export const App = () => {
    const [gallery, setGallery] = React.useState<any>(null);

    React.useEffect(() => {
        setTimeout(() => {
            setGallery(galleryMockResponse);
        }, 2500);
    }, []);

    return (
        <>
            <UIProgress/>
            <UIMenu/>
            <UIHeader title="Leicht.IO React UI Component Library"
                      imageUrl="https://leicht.io//assets/images/header-7.7f48e486decb2b9246586c0f33d03c942e25dcb23bb5f5d33dff9876f59ca2f9.jpg"/>

            <UIPageContainer>
                <UITypography type={"h3"}>Typography</UITypography>
                <UITypography type={"h1"}>Heading 1</UITypography>
                <UITypography type={"h2"}>Heading 2</UITypography>
                <UITypography type={"h3"}>Heading 3</UITypography>
                <UITypography type={"h4"}>Heading 4</UITypography>
                <UITypography type={"h5"}>Heading 5</UITypography>
                <UITypography type={"h6"}>Heading 6</UITypography>
                <UITypography type={"p"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut
                    labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit
                    anim id est laborum.</UITypography>
                <UITypography type={"p"}>Lorem upsim with an <a href="#">anchor</a>.</UITypography>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={"h3"}>Dividers</UITypography>

                <UIDivider size={"large"} border={true}/>
                <UIDivider size={"medium"} border={true}/>
                <UIDivider size={"small"} border={true}/>
                <UIDivider size={"medium"} border={false}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={"h3"}>Buttons</UITypography>

                <UIButton text="Primary Button" type="primary"/>
                <UIButton text="Danger Button" type="danger"/>
                <UIButton text="Success Button" type="success"/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={"h3"}>Modals</UITypography>

                <button className="btn btn--primary" id="showModal">Show Modal with IFRAME</button>
                <button className="btn btn--primary" id="showModalWithHtml">Show Modal with HTML</button>
            </UIPageContainer>

            <UIDivider size={"large"}/>

            <UIHeader gradient={true} title="Alternative Header" multiContent={true} breadcrumbs={"Home / Blog /"}
                      metadata={{
                          author: {
                              name: "Christian Leicht",
                              image: "https://leicht.io/assets/images/Christian%20Leicht.446ae6c5b506726034a6835e04683053805a01936559314861d01c9f7e999e51.jpg",
                              published: "May 15, 2019",
                              updated: "May 5, 2020",
                              length: "5 minutes read"
                          }
                      }}/>

            <UIPageContainer>
                <UITypography type={"h3"}>Icons</UITypography>
                <UIGrid columns={"four"}>
                    <UIIcon icon={"github"}/>
                    <UIIcon icon={"instagram"}/>
                    <UIIcon icon={"facebook"}/>
                    <UIIcon icon={"landscape"}/>
                    <UIIcon icon={"usa"}/>
                    <UIIcon icon={"three-d-model"}/>
                    <UIIcon icon={"electronics"}/>
                    <UIIcon icon={"mail"}/>
                    <UIIcon icon={"phone"}/>
                    <UIIcon icon={"chevron-down"}/>
                    <UIIcon icon={"hamburger"}/>
                    <UIIcon icon={"close"}/>
                    <UIIcon icon={"magnify"}/>
                </UIGrid>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={"h3"}>Gallery</UITypography>
                <UIGallery baseUrl="https://ni.leicht.io/" gallery={gallery}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={"h3"}>Grid & Cards</UITypography>
                <UIGrid columns={"four"}>
                    <UICard title="Title 1">
                        <img
                            src="https://ni.leicht.io/sunset_feggeklit.90238d8d3fba65a90cfd8d60beab1e230da73ed7_original.jpg"/>
                        <UITags tags={[
                            {type: "primary", name: "3D Print"},
                            {type: "secondary", name: "PCB"},
                        ]}/>
                    </UICard>

                    <UICard title="Title 2">
                        <p>This content is a paragraph</p>
                    </UICard>

                    <UICard title="Title 3">
                        <img
                            src="https://ni.leicht.io/sunset_kaloe.34af0caa00ad06dacc6a578f5bc30bd748d10e1a_medium.jpg"/>

                        <div className="ui-card--toolbar">
                            <div>
                                <p>Content left</p>
                            </div>
                            <div className="ui-icons">
                                <div className="ui-i ui-i--magnify ui-i--white"/>
                                <div className="ui-i ui-i--download ui-i--white"/>
                            </div>
                        </div>
                    </UICard>

                    <UICard title="Title 4">
                        <img
                            src="https://ni.leicht.io/wadden_sea.0039e6c00cf93aed50f037fcfbdfa31f5517546e_original.jpg"/>
                    </UICard>
                </UIGrid>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={"h3"}>Notifications</UITypography>

                <UINotification type="success" title="Success!" description="We'll be in touch!"/>
                <UINotification type="error" title="Error!" description="Please try again!"/>
            </UIPageContainer>
        </>
    );
};

/*
        const modal: HTMLElement | null = QuerySelector.get("#showModal");
        const modalWithHtml: HTMLElement | null = QuerySelector.get("#showModalWithHtml");

        if (modal && modalWithHtml) {
            modal.addEventListener(Event.CLICK, () => {
                new UIModal({
                    container: "body",
                    title: "IFRAME with Wikipedia",
                    iframe: "https://en.wikipedia.org/wiki/Ardbeg_distillery"
                });
            });

            modalWithHtml.addEventListener(Event.CLICK, () => {
                new UIModal({container: "body", title: "HTML", content: "<p>hej</p>"});
            });
*/
