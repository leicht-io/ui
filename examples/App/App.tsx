import React, {ReactElement} from 'react';
import {
    IGallery,
    IMenuItem,
    ISlide,
    UIButton,
    UICard,
    UICardTitle,
    UICardToolbar,
    UIDivider,
    UIGallery,
    UIGrid,
    UIHeader,
    UIIcon,
    UIImage,
    UIInput,
    UIMenu,
    UIModal,
    UINotification,
    UIPageContainer,
    UIProgress,
    UISlider,
    UITags,
    UITextArea,
    UITypography
} from '../../src';
import {galleryMockResponse} from '../assets/gallery.mock';
import {sliderMockResponse} from '../assets/slider.mock';
import {MenuMock} from '../assets/menuMock';
import {logo} from '../assets/logo';

export const App = (): ReactElement => {
    const [gallery, setGallery] = React.useState<IGallery | null>(null);
    const [showModal1, setShowModal1] = React.useState<boolean>(false);
    const [showModal2, setShowModal2] = React.useState<boolean>(false);
    const [imageSource, setImageSource] = React.useState<string | null>(null);
    const [menuItems] = React.useState<IMenuItem[]>(MenuMock);
    const [slides, setSlides] = React.useState<ISlide[] | null>(null);
    const [title, setTitle] = React.useState<string | null>(null);
    const [text, setText] = React.useState<string | null>(null);

    React.useEffect(() => {
        setTimeout(() => {
            setGallery(galleryMockResponse);
            setImageSource('https://ni.leicht.io/wadden_sea.0039e6c00cf93aed50f037fcfbdfa31f5517546e_original.jpg');

            setSlides(sliderMockResponse);

            setTitle('Leicht.IO React UI Component Library');
            setText("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor            incididunt ut            labore et            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut            aliquip ex            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum            dolore eu fugiat            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia            deserunt mollit            anim id est laborum.")
        }, 2500);
    }, []);

    return (
        <>
            <UIProgress/>
            <UIMenu
                menuItems={menuItems}
                logo={logo}
                onNavigate={(destination: IMenuItem) => {
                    // eslint-disable-next-line no-console
                    console.log('Navigating to', destination.title);
                }}
            />
            <UIHeader title={{value: title, skeleton: true}}
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

            <UIPageContainer>
                <UITypography type={'h3'}>Dividers</UITypography>

                <UIDivider size={'large'} showBorder={true}/>
                <UIDivider size={'medium'} showBorder={true}/>
                <UIDivider size={'small'} showBorder={true}/>
                <UIDivider size={'medium'} showBorder={false}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Buttons</UITypography>

                <UIButton text="Primary Button" type="primary"/>
                <UIButton text="Danger Button" type="danger"/>
                <UIButton text="Success Button" type="success"/>
                <UIButton text="Disabled Button" type="success" disabled={true}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Modals</UITypography>

                <UIButton type={'primary'} onClick={() => {
                    setShowModal1(true);
                }}>Show Modal with IFRAME</UIButton>
                <UIButton type={'primary'} onClick={() => {
                    setShowModal2(true);
                }}>Show Modal with HTML</UIButton>
            </UIPageContainer>

            <UIDivider size={'large'}/>

            <UIHeader
                gradient={true}
                title={{value: 'Alternative Header'}}
                multiContent={true}
                breadcrumbs={'Home / Blog /'}
                metadata={{
                    author: {
                        name: 'Christian Leicht',
                        image: 'https://leicht.io/assets/images/Christian%20Leicht.446ae6c5b506726034a6835e04683053805a01936559314861d01c9f7e999e51.jpg',
                        published: 'May 15, 2019',
                        updated: 'May 5, 2020',
                        length: '5 minutes read'
                    }
                }}/>

            <UIPageContainer>
                <UITypography type={'h3'}>Icons</UITypography>
                <UIGrid columns={'four'}>
                    <UIIcon icon={'github'} size={'lg'}/>
                    <UIIcon icon={'instagram'} size={'lg'}/>
                    <UIIcon icon={'facebook'} size={'lg'}/>
                    <UIIcon icon={'landscape'} size={'lg'}/>
                    <UIIcon icon={'usa'} size={'lg'}/>
                    <UIIcon icon={'close'} size={'lg'}/>
                    <UIIcon icon={'threeDModel'} size={'lg'}/>
                    <UIIcon icon={'electronics'} size={'lg'}/>
                    <UIIcon icon={'mail'} size={'lg'}/>
                    <UIIcon icon={'phone'} size={'lg'}/>
                    <UIIcon icon={'chevronDown'} size={'lg'}/>
                    <UIIcon icon={'hamburger'} size={'lg'}/>
                    <UIIcon icon={'close'} size={'lg'}/>
                    <UIIcon icon={'closeSquare'} size={'lg'}/>
                    <UIIcon icon={'magnify'} size={'lg'}/>
                    <UIIcon icon={'download'} size={'lg'}/>
                </UIGrid>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Gallery</UITypography>
                <UIGallery baseUrl="https://ni.leicht.io/" gallery={gallery} skeletons={12}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Images</UITypography>
                <UIImage
                    skeletonHeight={658}
                    label={{text: 'This is the label', background: true}}
                    source={imageSource}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Grid & Cards</UITypography>
                <UIGrid columns={'four'}>
                    <UICard>
                        <UICardToolbar text={"Title"} position={"top"} textAlignment={"center"}/>
                        <UIImage
                            source={'https://ni.leicht.io/sunset_feggeklit.90238d8d3fba65a90cfd8d60beab1e230da73ed7_original.jpg'}/>
                        <UICardToolbar
                            text="Content Left"
                            icons={[{
                                id: 'download',
                                onClick: () => {
                                    // eslint-disable-next-line no-console
                                    console.log('Clicked icon');
                                }
                            }, {
                                id: 'magnify',
                                onClick: () => {
                                    // eslint-disable-next-line no-console
                                    console.log('Clicked icon');
                                }
                            }]}/>
                    </UICard>

                    <UICard>
                        <UIImage
                            source={'https://ni.leicht.io/sunset_feggeklit.90238d8d3fba65a90cfd8d60beab1e230da73ed7_original.jpg'}/>

                        <UITags tags={[
                            {type: 'primary', name: '3D Print'},
                            {type: 'secondary', name: 'PCB'},
                        ]}/>
                    </UICard>

                    <UICard>
                        <UIImage
                            source="https://ni.leicht.io/sunset_kaloe.34af0caa00ad06dacc6a578f5bc30bd748d10e1a_medium.jpg"/>

                        <UICardToolbar text="Content Left" icons={[{
                            id: 'facebook',
                            onClick: () => {
                                // eslint-disable-next-line no-console
                                console.log('Clicked icon');
                            }
                        }]}/>
                    </UICard>

                    <UICard>
                        <UICardTitle title={'Title 4'} asOverlay={true}/>
                        <UIImage
                            source="https://ni.leicht.io/wadden_sea.0039e6c00cf93aed50f037fcfbdfa31f5517546e_original.jpg"/>
                    </UICard>
                </UIGrid>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Inputs</UITypography>

                <UIInput label={'Input Label'} onChange={(value: string) => {
                    // eslint-disable-next-line no-console
                    console.log('Value:', value);
                }}/>
                <UIInput label={'Input Label'} onChange={(value: string) => {
                    // eslint-disable-next-line no-console
                    console.log('Value:', value);
                }}/>

                <UITextArea label={'Input Label'} onChange={(value: string) => {
                    // eslint-disable-next-line no-console
                    console.log('Value:', value);
                }}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Notifications</UITypography>

                <UINotification type="success" title="Success!" description="We'll be in touch!"/>
                <UINotification type="error" title="Error!" description="Please try again!"/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Slider (based on GlideJS)</UITypography>
            </UIPageContainer>

            <UISlider slides={slides} basePath={'https://ni.leicht.io/'}/>

            <UIModal type={'IFRAME'} title={'Modal Title'} show={showModal1} onHide={() => {
                setShowModal1(false);
            }}
                     iframeUrl={'https://en.wikipedia.org/wiki/Ardbeg_distillery'}/>

            <UIModal title={'Modal Title'} show={showModal2} onHide={() => {
                setShowModal2(false);
            }}>
                <UITypography type="p">With HTML content</UITypography>
            </UIModal>
        </>
    );
};
