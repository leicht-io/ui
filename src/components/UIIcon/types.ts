export interface IProps {
  icon: 'facebook' | 'instagram' | 'github' | 'landscape' | 'usa' | 'threeDModel' | 'electronics' | 'mail' | 'phone' | 'chevronDown' | 'hamburger' | 'closeSquare' | 'magnify' | 'close' | 'download';

  size?: 'sm' | 'md' | 'lg';

  color?: 'white' | 'grey' | 'black';

  onClick?: () => void;
}
