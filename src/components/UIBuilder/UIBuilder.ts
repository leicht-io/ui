import {UIPart} from "./UIPart";

export class UIBuilder {
    private uiParts: UIPart[] = [];

    constructor() {
        return this;
    }

    public with(element: any, ...args: any): UIBuilder {
        this.uiParts.push({classEntry: element, args: args});

        return this;
    }

    public run(): void {
        for (const uiPart of this.uiParts) {
            const classEntry = uiPart.classEntry;
            const args = uiPart.args;

            this.invoke(classEntry, args);
        }
    }

    private invoke(constructor: any, args: any) {
        let _function;

        function F(): void {
            // @ts-ignore
            return constructor.apply(this, args);
        }

        F.prototype = constructor.prototype;
        _function = new F();
        _function.constructor = constructor;

        return _function;
    }
}
