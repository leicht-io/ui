export interface MenuItem {
  title: string;
  link?: string;
  button?: boolean;
  active?: boolean;

  expanded?: boolean;

  menuItems?: MenuItem[];
}

export interface IProps {
  menuItems: MenuItem[];
  logo: any;

  onNavigate: (destination: MenuItem) => void;
}
