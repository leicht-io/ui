export interface IProps {
  source: string;
  label?: { text: string; background?: boolean };

  responsive?: boolean;
  round?: boolean;

  width?: number | string;
  height?: number | string;

  alt?: string;

  skeletonHeight?: number;

  onClick?: () => void;
}
