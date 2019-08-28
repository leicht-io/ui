export class GridSkeleton {
    public static handle(parent: Element, childNodes: Element[]): void {
        const skeletons: NodeListOf<Element> = parent.querySelectorAll(".grid-item");

        for (let i = 0; i < childNodes.length; i++) {
            const node: Element = childNodes[i];

            if (i < skeletons.length) {
                Array.from(node.children).forEach(childNode => {
                    skeletons.item(i).append(childNode);
                })
            } else {
                parent.append(node)
            }
        }
    }
}
