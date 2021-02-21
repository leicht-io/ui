import React, {ReactElement} from 'react';
import './UIHeader.scss';
import {IProps} from './types';
import {UICard} from '../UICard';

export const UIHeader = React.memo((props: IProps): ReactElement => {
  const getContent = () => {
    if (props.multiContent) {
      return (
        <div className="header--content">
          {props.breadcrumbs && (
            <div className="header--row">
              <p className="breadcrumbs hidden-xs">{props.breadcrumbs}</p>
            </div>
          )}

          <div className="header--row">
            <h1 className={ props.title.value ? 'ui-header-title--visible' : 'ui-header-title--invisible' }>{props.title.value}</h1>
          </div>

          {props.metadata && props.metadata.author && (
            <div className="header--row">
              <div className="header--metadata">
                <div className="blog-metadata author-image">
                  {(props.metadata.author.name && props.metadata.author.image) && (
                    <UICard
                      hideTitle={ true }
                      responsive={ true }
                      round={ true }
                      alt={ props.metadata.author.name }
                      backgroundUrl={ props.metadata.author.image }
                      width="80"
                      height="80" />
                  )}
                </div>
                <div className="blog-metadata blog-author">
                  <p className="blog-metadata-light">{props.metadata.author.name ? 'Author' : ''}</p>
                  <p className="blog-metadata-dark">{props.metadata.author.name}</p>
                </div>
                <div className="blog-metadata blog-published">
                  <p className="blog-metadata-light">{props.metadata.author.published ? 'Published' : ''}</p>
                  <p className="blog-metadata-dark">{props.metadata.author.published}</p>
                </div>
                <div className="blog-metadata blog-updated">
                  <p className="blog-metadata-light">{props.metadata.author.updated ? 'Updated' : ''}</p>
                  <p className="blog-metadata-dark">{props.metadata.author.updated}</p>
                </div>
                <div className="blog-metadata blog-length">
                  <p className="blog-metadata-light">{props.metadata.author.length ? 'Length' : ''}</p>
                  <p className="blog-metadata-dark">{props.metadata.author.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <h1 className={ props.title.value ? 'ui-header-title--visible' : 'ui-header-title--invisible' }>{props.title.value}</h1>
      );
    }
  };

  const getTopGradient = () => {
    return (props.gradient && (<div className="header--bg-top-gradient" />));
  };

  const getBottomGradient = () => {
    return (props.gradient && (<div className="header--bg-bottom-gradient" />));
  };

  const getHeaderImage = () => {
    return (
      <img alt="Header Image" className={ 'ui-header-img' } src={ props.imageUrl } onLoad={ (element) => {
        element.currentTarget.style.setProperty('opacity', '1');
      } } />
    );
  };

  const getClasses = () => {
    let baseClasses: string = 'header header-full-width ';
    if (props.size) {
      baseClasses += 'ui-header--' + props.size;
    } else {
      baseClasses += 'ui-header--large';
    }

    return baseClasses;
  };

  return (
    <header className={ getClasses() }>
      {getTopGradient()}
      {getContent()}
      {getBottomGradient()}
      {getHeaderImage()}
    </header>
  );
});

UIHeader.displayName = 'UIHeader';
