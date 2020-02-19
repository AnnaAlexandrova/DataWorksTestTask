class Node {
    data: number;
    right: Node | null;
    left: Node | null;

    constructor(data: number) {
        this.data = data;
        this.right = null;
        this.left = null;
    }
}

export class BinaryTree {
    root: Node | null;

    constructor() {
        this.root = null;
    }

    add(data: number) {
        const newNode = new Node(data);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.addNode(this.root, newNode);
        }
    }

    addNode(root: Node, newNode: Node) {
        if (newNode.data < root.data) {
            if (root.left === null) {
                root.left = newNode;
            } else {
                this.addNode(root.left, newNode);
            }
        } else {
            if (root.right === null) {
                root.right = newNode;
            } else {
                this.addNode(root.right, newNode);
            }
        }
    }

    traverseInWidth(): number[] | undefined {
        if (this.root === null) {
            return;
        }

        let queue: Node[] = [];
        let values: number[] = [];
        queue.push(this.root);

        while (queue.length > 0) {
            let tempNode: Node | undefined = queue.shift();

            if (tempNode) {
                values.push(tempNode.data);
                if (tempNode.left) {
                    queue.push(tempNode.left);
                }

                if (tempNode.right) {
                    queue.push(tempNode.right);
                }
            }
        }

        return values;
    }

    traverseInDepth(): number[] | undefined {
        if (this.root === null) {
            return;
        }

        let deque: Node[] = [];
        let values: number[] = [];
        deque.push(this.root);

        while (deque.length > 0) {
            let tempNode: Node | undefined = deque.pop();

            if (tempNode) {
                values.push(tempNode.data);
                if (tempNode.right) {
                    deque.push(tempNode.right);
                }

                if (tempNode.left) {
                    deque.push(tempNode.left);
                }
            }
        }
        return values;
    }
}