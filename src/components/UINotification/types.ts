export interface IProps {
  type: 'error' | 'warning' | 'success';
  title: string;
  description: string;
}