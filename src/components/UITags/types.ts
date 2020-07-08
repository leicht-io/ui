export interface IProps {
  tags: ITag[];
}

export interface ITag {
  type: 'primary' | 'secondary';
  name: string;
}
