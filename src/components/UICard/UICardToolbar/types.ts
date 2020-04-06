import { IProps as IIconProps } from '../../UIIcon/types';

export interface IProps {
    text?: string;
    icons?: { id: IIconProps['icon'], onClick: () => void }[];
}
