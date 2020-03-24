import React from "react";
import {UIDivider, UIHeader, UIMenu, UIPageContainer, UIProgress, UITags} from "../../src/components";
import {UINotification} from "../../src/components/UINotification";
import {UICard} from "../../src/components/UICard";
import {UIGrid} from "../../src/components/UIGrid";

export const App = () => {
    return (
        <>
            <UIProgress/>
            <UIMenu/>
            <UIHeader/>
            <UIDivider size={"large"}/>

            <UIPageContainer>
                <h1>Leicht.io UI Library (heading 1)</h1>
                <h2>Typhography (heading 2)</h2>
                <h3>Heading 3</h3>

                <p>Lorem upsim with an <a href="#">anchor</a></p>

                <div id="text">
                    <h3>Standard-afsnittet brugt siden 1500-tallet</h3>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex
                        ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat
                        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                        deserunt mollit
                        anim id est laborum."</p>
                    <h3>Afsnit 1.10.32 fra "de Finibus Bonorum et Malorum", skrevet af Cicero i 45 f.kr.</h3>
                    <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                        laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
                        explicabo.
                        Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                        consequuntur magni
                        dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
                        quia dolor
                        sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore
                        et dolore
                        magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
                        corporis
                        suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                        reprehenderit qui in
                        ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
                        voluptas
                        nulla pariatur?"</p>
                    <h3>1914-oversættelsen af Rackham</h3>
                    <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain
                        was born and I
                        will give you a complete account of the system, and expound the actual teachings of the great
                        explorer of
                        the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure
                        itself,
                        because it is pleasure, but because those who do not know how to pursue pleasure rationally
                        encounter
                        consequences that are extremely painful. Nor again is there anyone who loves or pursues or
                        desires to obtain
                        pain of itself, because it is pain, but because occasionally circumstances occur in which toil
                        and pain can
                        procure him some great pleasure. To take a trivial example, which of us ever undertakes
                        laborious physical
                        exercise, except to obtain some advantage from it? But who has any right to find fault with a
                        man who
                        chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that
                        produces no
                        resultant pleasure?"</p>
                    <h3>Afsnit 1.10.33 fra "de Finibus Bonorum et Malorum", skrevet af Cicero i 45 f.kr.</h3>
                    <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                        deleniti
                        atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident,
                        similique
                        sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum
                        quidem rerum
                        facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil
                        impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
                        dolor
                        repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
                        eveniet ut et
                        voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a
                        sapiente delectus,
                        ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
                        repellat."</p>
                    <h3>1914-oversættelsen af Rackham</h3>
                    <p>"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled
                        and
                        demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot
                        foresee the pain
                        and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty
                        through
                        weakness of will, which is the same as saying through shrinking from toil and pain. These cases
                        are
                        perfectly simple and easy to distinguish. In a free hour, when our power of choice is
                        untrammelled and when
                        nothing prevents our being able to do what we like best, every pleasure is to be welcomed and
                        every pain
                        avoided. But in certain circumstances and owing to the claims of duty or the obligations of
                        business it will
                        frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man
                        therefore always
                        holds in these matters to this principle of selection: he rejects pleasures to secure other
                        greater
                        pleasures, or else he endures pains to avoid worse pains."</p>
                </div>

                <UIDivider size={"medium"} border={true}/>

                <h3>Buttons</h3>
                <div>
                    <button className="btn btn--primary">Primary Button</button>
                    <button className="btn btn--danger">Danger Button</button>
                    <button className="btn btn--success">Success Button</button>
                </div>

                <UIDivider size={"medium"} border={true}/>

                <h3>Modals</h3>
                <div>
                    <button className="btn btn--primary" id="showModal">Show Modal with IFRAME</button>
                    <button className="btn btn--primary" id="showModalWithHtml">Show Modal with HTML</button>
                </div>

                <UIDivider size={"medium"} border={true}/>

                <h3>Icons</h3>
                <div className="grid grid--direction-row grid--align-center-vertical">
                    <div className="ui-i ui-i--lg ui-i--github"/>
                    <div className="ui-i ui-i--lg ui-i--instagram"/>
                    <div className="ui-i ui-i--lg ui-i--facebook"/>
                    <div className="ui-i ui-i--lg ui-i--landscape"/>
                    <div className="ui-i ui-i--lg ui-i--usa"/>
                    <div className="ui-i ui-i--lg ui-i--three-d-model"/>
                    <div className="ui-i ui-i--lg ui-i--electronics"/>
                    <div className="ui-i ui-i--lg ui-i--mail"/>
                    <div className="ui-i ui-i--lg ui-i--phone"/>
                    <div className="ui-i ui-i--lg ui-i--chevron-down"/>
                    <div className="ui-i ui-i--lg ui-i--hamburger"/>
                    <div className="ui-i ui-i--lg ui-i--close"/>
                </div>

                <UIDivider size={"medium"} border={true}/>

                <h3>Gallery</h3>
                <div className="ui-gallery grid-container grid-two-columns">
                    <div className="grid-item">
                    </div>
                    <div className="grid-item">
                    </div>
                    <div className="grid-item">
                    </div>
                    <div className="grid-item">
                    </div>
                </div>
            </UIPageContainer>

            <UIPageContainer>
                <h3>Grid & Cards</h3>
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
                <h3>Notifications</h3>
                <UIDivider size={"medium"} border={true}/>

                <UINotification type="success" title="Success!" description="We'll be in touch!"/>
                <UINotification type="error" title="Error!" description="Please try again!"/>
            </UIPageContainer>
        </>
    );
};


/*
import {UIModal} from "../../src/components/UIModal";
import "../../src/@core/styles/@theme.scss";
import {UIGallery} from "../src/components/UIGallery";
import {UIMenu} from "../src/components/UIMenu";
import {UIReadingPositionIndicator} from "../src/components/UIReadingPositionIndicator/UIReadingPositionIndicator";
import {UIBuilder} from "../src/components/UIBuilder/UIBuilder";
import {galleryMockResponse} from "./assets/gallery.mock";
import {QuerySelector} from "../src/@core/DOM/QuerySelector";
import {Event} from "../src/@core/DOM/models/Event";

export class App {

    constructor() {
        new UIBuilder()
            .with(UIMenu)
            .with(UIReadingPositionIndicator)
            .run();

        setTimeout(() => {
            new UIGallery({
                selector: ".ui-gallery",
                baseUrl: "https://ni.leicht.io/",
                data: galleryMockResponse
            }).render();
        }, 1500);

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
        }
    }

}

new App();
*/