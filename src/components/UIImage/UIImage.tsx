import { IProps } from './types';
import React from 'react';
import { UITypography } from '../UITypography';
import './UIImage.scss';

export const UIImage = (props: IProps) => {
    const [loaded, setLoaded] = React.useState<boolean>(false);

    const getImage = () => {
        return <img
            className={ 'ui-img ' + (props.round ? 'ui-img-round ' : '') + (props.responsive ? 'ui-img-responsive ' : '') }
            alt={ props.alt ? props.alt : '' }
            width={ props.width ? props.width : '' }
            height={ props.height ? props.height : '' }
            src={ props.source } onLoad={ () => {
            setLoaded(true);
        } } />;
    };

    const getOverlay = () => {
        return <div className="ui-img-overlay" />;
    };

    const getLabel = () => {
        if (props.label) {
            return (<div className="ui-img-label">
                <UITypography type="p">{ props.label }</UITypography>
            </div>);
        } else {
            return null;
        }
    };

    return (
        <div className={ 'ui-image ' + (loaded === false ? 'ui-image-loading' : 'ui-image-loaded') } style={ {height: props.height} } >
            { getOverlay() }
            { getImage() }
            { getLabel() }
        </div>
    );
};
