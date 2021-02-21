export interface IProps {
  tabIndex?: number;
  text?: string;
  children?: any;
  type: 'success' | 'danger' | 'primary';
  onClick?: () => void;
  disabled?: boolean;
}
