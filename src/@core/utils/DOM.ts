export class DOM {
    constructor() {

    }

    public static query(query: string): Element {
        const element: Element | null = document.querySelector(query);
        if (element) {
            return element;
        }

        return new Element();
    }

    public static generateUUID(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
}
