import {IMetaData} from '../../types';

export interface IProps {
  title: {
    value: string | null;
    skeleton?: boolean;
  };

  size?: 'small' | 'large';

  imageUrl?: string;
  gradient?: boolean;

  breadcrumbs?: string;

  multiContent?: boolean;
  metadata?: IMetaData;
}
