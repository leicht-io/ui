import {IPhoto} from './IPhoto';

export interface IGallery {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  photos: IPhoto[];
}