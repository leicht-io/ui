export interface IProps {
    text: string;
    type: "success" | "danger" | "primary";
    onClick?: () => void;
}