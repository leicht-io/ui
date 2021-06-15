import React, {ReactElement} from 'react';
import {
    IGallery,
    IMenuItem,
    ISlide,
    UIButton,
    UICard,
    UICardToolbar,
    UIDivider,
    UIGallery,
    UIGrid,
    UIHeader,
    UIIcon,
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

export const App = (): ReactElement => {

    const [gallery, setGallery] = React.useState<IGallery | null>(null);
    const [showModal1, setShowModal1] = React.useState<boolean>(false);
    const [showModal2, setShowModal2] = React.useState<boolean>(false);
    const [imageSource, setImageSource] = React.useState<string | null>(null);
    const [slides, setSlides] = React.useState<ISlide[] | null>(null);
    const [title, setTitle] = React.useState<string | null>(null);
    const [notifications, setNotifications] = React.useState<{ type: any, title: string, message: string }[]>([{
        type: "error",
        Title: "Error!",
        message: "This is an error notification"
    }, {type: "success", message: "This is a success notification", title: "Success!"}]);

    React.useEffect(() => {
        setTimeout(() => {
            setGallery(galleryMockResponse);
            setImageSource('https://ni.leicht.io/wadden_sea.0039e6c00cf93aed50f037fcfbdfa31f5517546e_original.jpg');

            setSlides(sliderMockResponse);

            setTitle('Leicht.IO React UI Component Library');
        }, 2500);
    }, []);

    return (
        <>
            <UISlider slides={slides} basePath={'https://ni.leicht.io/'}/>

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
                <UICard
                    skeletonHeight={658}
                    title='This is the label'
                    backgroundUrl={imageSource}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Grid & Cards</UITypography>
                <UIGrid columns={'four'}>
                    <UICard title={"This is a very long title that is very long"} titleAlignment={"left"}
                            backgroundUrl={'https://ni.leicht.io/sunset_feggeklit.90238d8d3fba65a90cfd8d60beab1e230da73ed7_original.jpg'}>
                        <UICardToolbar
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

                    <UICard
                        backgroundUrl={'https://ni.leicht.io/sunset_feggeklit.90238d8d3fba65a90cfd8d60beab1e230da73ed7_original.jpg'}>
                        <UITags tags={[
                            {type: 'primary', name: '3D Print'},
                            {type: 'secondary', name: 'PCB'},
                        ]}/>
                    </UICard>

                    <UICard title={"title"}
                            backgroundUrl="https://ni.leicht.io/sunset_kaloe.34af0caa00ad06dacc6a578f5bc30bd748d10e1a_medium.jpg">
                        <UICardToolbar icons={[{
                            id: 'facebook',
                            onClick: () => {
                                // eslint-disable-next-line no-console
                                console.log('Clicked icon');
                            }
                        }]}/>
                    </UICard>

                    <UICard title={'This is also a very long title that is very long'}
                            backgroundUrl="https://ni.leicht.io/wadden_sea.0039e6c00cf93aed50f037fcfbdfa31f5517546e_original.jpg"/>
                </UIGrid>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Inputs</UITypography>

                <UIGrid columns={"two"}>
                    <UIInput
                        tabIndex={1}
                        label={'Input Label'}
                        onChange={(value: string) => {
                            // eslint-disable-next-line no-console
                            console.log('Value:', value);
                        }}/>
                    <UIInput
                        tabIndex={2}
                        label={'Input Label'}
                        onChange={(value: string) => {
                            // eslint-disable-next-line no-console
                            console.log('Value:', value);
                        }}/>
                </UIGrid>

                <UITextArea
                    tabIndex={3}
                    label={'Input Label'}
                    onChange={(value: string) => {
                        // eslint-disable-next-line no-console
                        console.log('Value:', value);
                    }}/>

                <UIButton text="Primary Button" type="primary" disabled={true}/>
            </UIPageContainer>

            <UIPageContainer>
                <UITypography type={'h3'}>Notifications</UITypography>

                {notifications.map(notification => {
                    return (
                        <UINotification
                            type={notification.type}
                            title={notification.title}
                            description={notification.message}/>
                    );
                })}

                <UIButton type={"primary"}
                          onClick={() => {
                              const tempNotifications = [...notifications];
                              tempNotifications.push({
                                  title: "Error!",
                                  message: "This is an error notification",
                                  type: "error"
                              })
                              setNotifications(tempNotifications)
                          }}>
                    Add Notification
                </UIButton>
            </UIPageContainer>

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
