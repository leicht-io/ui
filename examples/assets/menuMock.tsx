import { MenuItem } from '../../src/components/UIMenu/types';

export const MenuMock: MenuItem[] = [
    {
        title: 'Home',
        link: '/'
    }, {
        title: 'About',
        menuItems: [{
            title: 'Company',
            link: '/company'
        }, {
            title: 'Careers',
            link: '/careers'
        }, {
            title: 'Team',
            link: '/team'
        }]
    }, {
        title: 'Services',
        link: '/services'
    }, {
        title: 'Partners',
        link: '/partners'
    }, {
        title: 'Contact',
        link: '/contact'
    }, {
        title: 'Shop',
        link: '/shop',
        button: true
    }
];
