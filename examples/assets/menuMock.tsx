import {IMenuItem} from '../../src/types';

export const MenuMock: IMenuItem[] = [
  {
    title: 'Home',
    link: '/',
    active: true,
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
