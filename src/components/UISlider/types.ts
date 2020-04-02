export interface FullSize {
    width: number;
    height: number;
    path: string;
}

export interface StandardThumb {
    width: number;
    height: number;
    path: string;
}

export interface MediumThumb {
    width: number;
    height: number;
    path: string;
}

export interface LargeThumb {
    width: number;
    height: number;
    path: string;
}

export interface Thumbs {
    standardThumb: StandardThumb;
    mediumThumb: MediumThumb;
    largeThumb: LargeThumb;
}

export interface HeaderImage {
    fullSize: FullSize;
    thumbs: Thumbs;
}

export interface ISlide {
    id: number;
    title: string;
    content: string;
    slug: string;
    excerpt: string;
    readTimeInSeconds: number;
    headerImage: HeaderImage;
    tags?: any;
    status: string;
    category?: any;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt?: any;
}

export interface IProps {
    slides: ISlide[];
}
