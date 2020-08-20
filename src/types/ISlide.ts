import {IHeaderImage} from './IHeaderImage';
import {ITag} from './ITag';

export interface ISlide {
  id: number;
  title: string;
  content: string;
  slug: string;
  excerpt: string;
  readTimeInSeconds: number;
  headerImage: IHeaderImage;
  tags?: ITag | null;
  status: string;
  category?: any;
  parentEntities?: any;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
