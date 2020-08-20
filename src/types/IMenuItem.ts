export interface IMenuItem {
  title: string;
  link?: string;
  button?: boolean;
  active?: boolean;

  expanded?: boolean;

  menuItems?: IMenuItem[];
}