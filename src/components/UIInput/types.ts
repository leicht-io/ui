export interface IProps {
  tabIndex?: number;
  label: string;
  required?: boolean;
  autoComplete?: boolean;
  onChange: (value: string) => void;
}
