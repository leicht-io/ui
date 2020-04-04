import React from 'react';
import './UIHeader.scss';
import { IProps } from './types';
import { UIImage } from '../UIImage';

export const UIHeader = (props: IProps) => {
    const getContent = () => {
        if (props.multiContent) {
            return (
                <div className="header--content">
                    { props.breadcrumbs && (
                        <div className="header--row">
                            <p className="breadcrumbs hidden-xs">{ props.breadcrumbs }</p>
                        </div>
                    ) }

                    <div className="header--row">
                        <h1>{ props.title }</h1>
                    </div>

                    { props.metadata && props.metadata.author && (
                        <div className="header--row">
                            <div className="header--metadata">
                                <div className="blog-metadata author-image">
                                    <UIImage responsive={ true } round={ true }
                                             alt={ props.metadata.author.image }
                                             source={ props.metadata.author.image }
                                             width="80"
                                             height="80" />
                                </div>
                                <div className="blog-metadata blog-author">
                                    <p className="blog-metadata-light">Author</p>
                                    <p className="blog-metadata-dark">{ props.metadata.author.name }</p>
                                </div>
                                <div className="blog-metadata blog-published">
                                    <p className="blog-metadata-light">Published</p>
                                    <p className="blog-metadata-dark">{ props.metadata.author.published }</p>
                                </div>
                                <div className="blog-metadata blog-updated">
                                    <p className="blog-metadata-light">Updated</p>
                                    <p className="blog-metadata-dark">{ props.metadata.author.updated }</p>
                                </div>
                                <div className="blog-metadata blog-length">
                                    <p className="blog-metadata-light">Length</p>
                                    <p className="blog-metadata-dark">{ props.metadata.author.length }</p>
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
            );
        } else {
            return (<h1>{ props.title }</h1>);
        }
    };

    const getGradient = () => {
        return (props.gradient && (<div className="header--bg-top-gradient" />));
    };

    return (
        <header
            className="header header-full-width"
            style={ {backgroundImage: ' url(\'' + props.imageUrl + '\')'} }>

            { getGradient() }

            { getContent() }

            { props.gradient && (
                <div className="header--bg-bottom-gradient" />
            ) }
        </header>
    );
};
