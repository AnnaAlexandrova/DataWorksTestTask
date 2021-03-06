/**
 * In the project directory, you can run: npm start
 * Runs the app in the development mode.
 * Open http://localhost:3000 to view it in the browser.
 *
 * You can enter a sequence of numbers with whitespace as a split
 * to create a binary tree and display it
 * with traverse in depth and traverse in width.
 * Input data can't be empty and can be only numbers.
 *
 * To improve this realization it's possible to add client validation
 * using for e.g. bootstrap validation styles.
 * It possible to make this realization with another types of data.
 * Not only numbers. If add a comparator.
 */

import React from "react";
import {Button, Form, Col} from "react-bootstrap";
import "../App.css";
import "./MyTree.css";
import {BinaryTree} from "./BinaryTree";

type MyTreeProps = {}

type MyTreeState = {
    tree: BinaryTree;
    inputData: string;
    treeTraversedInWidth: string | undefined;
    treeTraversedInDepth: string | undefined;
}

export class MyTree extends React.Component<MyTreeProps, MyTreeState> {
    constructor(props: MyTreeProps) {
        super(props);

        const binaryTree = new BinaryTree();

        this.state = {
            tree: binaryTree,
            inputData: "",
            treeTraversedInWidth: "",
            treeTraversedInDepth: ""
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.handleAdditionToTree = this.handleAdditionToTree.bind(this);
        this.printTree = this.printTree.bind(this);
    }

    onInputChange(event: React.FormEvent) {
        const input = event.target as HTMLInputElement;
        this.setState({inputData: input.value});
    }

    handleAdditionToTree(event: React.FormEvent) {
        event.preventDefault();

        if (this.state.inputData.trim().length === 0) {
            return;
        }
        const treeNodes: string[] = this.state.inputData.split(" ");

        const copiedTree: BinaryTree = new BinaryTree();
        for (let item of treeNodes) {
            if (isNaN(Number(item))) {
                alert("Введены некорректные данные");
                this.setState({inputData: ""});
                return;
            }
            copiedTree.add(Number(item));
        }
        this.setState({
            tree: copiedTree,
            inputData: ""
        });
    }

    printTree() {
        this.setState({
            treeTraversedInWidth: this.treeToString(this.state.tree.traverseInWidth()),
            treeTraversedInDepth: this.treeToString(this.state.tree.traverseInDepth())
        });
    }

    treeToString(tree: number[] | undefined): string | undefined {
        return tree?.join(" ");
    }

    render() {
        return (
            <div className="content-style">
                <Form className="form-style" onSubmit={this.handleAdditionToTree}>
                    <Form.Row>
                        <Form.Group as={Col} md="8">
                            <Form.Label>Добавить узлы в дерево (значения - числа, разделитель - пробел)</Form.Label>
                            <Form.Control type="text" value={this.state.inputData}
                                          onChange={this.onInputChange}
                                          placeholder="3 17 34"
                                          required/>
                        </Form.Group>
                        <Col>
                            <Button variant="primary" type="submit"
                                    className="button-style">Добавить</Button>
                        </Col>
                    </Form.Row>
                </Form>

                <div>
                    <Button variant="primary"
                            onClick={this.printTree}>Отобразить дерево</Button>
                    <div className="tree-traversed-style">
                        <label>Результат обхода в ширину:</label>
                        <div>{this.state.treeTraversedInWidth}</div>
                    </div>
                    <div className="tree-traversed-style">
                        <label>Результат обхода в глубину:</label>
                        <div>{this.state.treeTraversedInDepth}</div>
                    </div>
                </div>
            </div>
        );
    }
}