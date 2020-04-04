export interface IProps {
    title: string;

    imageUrl?: string;
    gradient?: boolean;

    breadcrumbs?: string;

    multiContent?: boolean;
    metadata?: IMetadata;
}

export interface IMetadata {
    author: IAuthor;
}

export interface IAuthor {
    image: string;
    name: string;
    published: string;
    updated: string;
    length: string;
}
