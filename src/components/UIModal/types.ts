export interface IProps {
    title: string;
    children?: any;
    type?: 'IFRAME';
    iframeUrl?: string;

    show: boolean;
    onHide?: () => void;
}
