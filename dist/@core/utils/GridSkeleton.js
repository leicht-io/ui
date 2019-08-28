export class GridSkeleton {
    static handle(parent, childNodes) {
        const skeletons = parent.querySelectorAll(".grid-item");
        for (let i = 0; i < childNodes.length; i++) {
            const node = childNodes[i];
            if (i < skeletons.length) {
                Array.from(node.children).forEach(childNode => {
                    skeletons.item(i).append(childNode);
                });
            }
            else {
                parent.append(node);
            }
        }
    }
}
//# sourceMappingURL=GridSkeleton.js.map