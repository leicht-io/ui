import {UIModalInterface} from "./UIModalInterface";
import {UIComponent} from "../../base/UIComponent";

export class UIModal extends UIComponent {
    constructor(content: UIModalInterface) {
        super(content);
    }

    public render(): string {
        const person = {
            name: 'Wes',
            job: 'Web Developer',
            city: 'Hamilton',
            bio: 'Wes is a really cool guy that loves to teach web development!'
        };

        return (`
             <div class="person">
                <h2>
                    ${person.name}
                </h2>
                <p class="location">${person.city}</p>
                <p class="bio">${person.bio}</p>
             </div>
            `);
    }

}