export interface IProps {

  backgroundUrl?: string | null;
  title?: string;

  hideTitle?: boolean;

  titleAlignment?: 'left' | 'center';

  responsive?: boolean;
  round?: boolean;

  width?: number | string;
  height?: number | string;

  alt?: string;

  skeletonHeight?: number;

  onClick?: () => void;

  children?: any;
}
