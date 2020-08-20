import {IGallery} from '../../types';

export interface IProps {
  baseUrl: string;
  gallery: IGallery | null;

  skeletons?: number;
}

