export interface MenuItem {
    title: string;
    link?: string;
    button?: boolean;
    menuItems?: MenuItem[];
}

export interface IProps {
    menuItems: MenuItem[];
    logo: any;
}
