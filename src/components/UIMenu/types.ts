import {IMenuItem} from '../../types';

export interface IProps {
  menuItems: IMenuItem[];
  logo: any;

  onNavigate: (destination: IMenuItem) => void;
}
