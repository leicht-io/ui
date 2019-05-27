enum UIModalTypes {
    DEFAULT = "DEFAULT",
    IFRAME = "IFRAME"
}

export interface UIModalInterface {
    container: string;
    title: string;
    description?: string;
    type?: UIModalTypes;
    content?: Element | string;
    iframe?: string;
}