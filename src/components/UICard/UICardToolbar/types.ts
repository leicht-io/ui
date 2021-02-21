import {IProps as IIconProps} from '../../UIIcon/types';

export interface IProps {
  icons?: { id: IIconProps['icon']; onClick: () => void }[];
}
