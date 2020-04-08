import { IProps } from './types';
import React from 'react';
import { UITypography } from '../UITypography';
import './UIImage.scss';
import { UILoader } from '../UILoader';

export const UIImage = (props: IProps) => {
    const [loaded, setLoaded] = React.useState<boolean>(false);

    const getImage = () => {
        return <img
            style={ {
                height: props.skeletonHeight,
                width: props.width ? props.width : '100%',
            } }
            className={ 'ui-img' }
            alt={ props.alt ? props.alt : '' }
            width={ props.width ? props.width : '' }
            height={ props.height ? props.height : '' }
            src={ props.source }
            onLoad={ () => {
                setLoaded(true);
            } } />;
    };

    const getLabel = () => {
        if (props.label) {
            return (<div className={ 'ui-img-label-wrapper' }>
                <div className="ui-img-label">
                    <UITypography type="p">{ props.label.text }</UITypography>
                </div>
            </div>);
        } else {
            return null;
        }
    };

    const getLoader = () => {
        return (
            <UILoader />
        );
    };

    return (
        <div
            className={ 'ui-image ' + (loaded === false ? 'ui-image-loading ' : 'ui-image-loaded ') + (props.onClick ? 'ui-image-pointer ' : '') + (props.round ? 'ui-img-round ' : '') + (props.responsive ? 'ui-img-responsive ' : '') }
            style={ {height: props.height} }
            onClick={ () => {
                if (props.onClick) {
                    props.onClick();
                }
            } }>
            { !loaded && getLoader() }
            { getImage() }
            { getLabel() }
        </div>
    );
};
