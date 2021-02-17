export interface IProps {
  text?: string;
  children?: any;
  type: 'success' | 'danger' | 'primary';
  onClick?: () => void;
  disabled?: boolean;
}
