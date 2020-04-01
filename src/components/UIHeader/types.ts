export interface IProps {
    title: string;

    imageUrl?: string;
    gradient?: boolean;

    breadcrumbs?: string;

    multiContent?: boolean;
    metadata?: { author: { image: string, name: string, published: string, updated: string, length: string } };
}
