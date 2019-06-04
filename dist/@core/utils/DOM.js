export class DOM {
    constructor() {
    }
    static query(query) {
        const element = document.querySelector(query);
        if (element) {
            return element;
        }
        return null;
    }
    static generateUUID(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
//# sourceMappingURL=DOM.js.map