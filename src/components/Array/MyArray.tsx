/**
 * In the project directory, you can run: npm start
 * Runs the app in the development mode.
 * Open http://localhost:3000 to view it in the browser.
 *
 * You can enter array height and width to create an array.
 * Input data can be only positive numbers and it can't be 0.
 *
 * To improve this realization it's possible to add client validation
 * using for e.g. bootstrap validation styles.
 */

import React from "react";
import {Button, Form, Col} from "react-bootstrap";
import "../App.css";

type MyArrayProps = {};

type MyArrayState = {
    columnsCount: string;
    rowsCount: string;
    width: number;
    height: number;
    matrix: number[][];
};

export class MyArray extends React.Component<MyArrayProps, MyArrayState> {
    constructor(props: MyArrayProps) {
        super(props);

        this.state = {
            columnsCount: "",
            rowsCount: "",
            width: 0,
            height: 0,
            matrix: []
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onColumnInputChange = this.onColumnInputChange.bind(this);
        this.onRowInputChange = this.onRowInputChange.bind(this);
    }

    onColumnInputChange(event: React.FormEvent) {
        const inputText = event.target as HTMLInputElement;

        this.setState({columnsCount: inputText.value});
    }

    onRowInputChange(event: React.FormEvent) {
        const inputText = event.target as HTMLInputElement;

        this.setState({rowsCount: inputText.value});
    }

    matrixSizeValidate(columnsCount: number, rowsCount: number): boolean {
        return !isNaN(columnsCount) || !isNaN(rowsCount) || columnsCount > 0 || rowsCount > 0;
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const widthVal: number = Number(this.state.columnsCount);
        const heightVal: number = Number(this.state.rowsCount);

        if (this.matrixSizeValidate(widthVal, heightVal)) {
            const newMatrix: number [][] = this.createMatrix(widthVal, heightVal);

            this.setState({
                width: widthVal,
                height: heightVal,
                matrix: newMatrix,
                columnsCount: "",
                rowsCount: ""
            });
        } else {
            alert("Введены некорректные данные");

            this.setState({
                columnsCount: "",
                rowsCount: ""
            });
        }
    }

    createMatrix(columnsCount: number, rowsCount: number): number[][] {
        let row: number = rowsCount - 1;
        let col: number = columnsCount - 1;

        let count: number = 0;
        let i: number = 0;
        let j: number = 0;
        let p: number = 0;

        let matrix: number[][] = [];
        for (let a = 0; a < rowsCount; a++) {
            matrix[a] = [];
        }

        const end: number = rowsCount * columnsCount - 1;

        while (count < end) {
            while (j < col) {
                count++;
                matrix[i][j] = count;
                if (count > end) {
                    break;
                }
                j++;
            }

            while (i < row) {
                count++;
                matrix[i][j] = count;
                if (count > end) {
                    break;
                }
                i++;
            }

            while (j > p) {
                count++;
                matrix[i][j] = count;
                if (count > end) {
                    break;
                }
                j--;
            }

            row--;
            col--;
            p++;

            while (i > p) {
                count++;
                matrix[i][j] = count;
                if (count > end) {
                    break;
                }
                i--;
            }
        }

        if (count === end) {
            count++;
            matrix[i][j] = count;
        }

        return matrix;
    }

    drawMatrix(matrix: number[][]) {
        let matrixTable: string = "<table><tbody><tr>";

        for (let i = 0; i < this.state.height; i++) {
            for (let j = 0; j < this.state.width; j++) {
                matrixTable += "<td>" + matrix[i][j].toString() + "</td>";
            }
            matrixTable += "</tr><tr>";
        }
        matrixTable += "</tr></tbody></table>";

        return <div dangerouslySetInnerHTML={{__html: matrixTable}}/>;
    }

    render() {
        return (
            <div className="content-style">
                <Form className="form-style" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Ширина массива</Form.Label>
                            <Form.Control type="text"
                                          value={this.state.columnsCount}
                                          onChange={this.onColumnInputChange}
                                          placeholder="4"
                                          required/>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Высота массива</Form.Label>
                            <Form.Control type="text"
                                          value={this.state.rowsCount}
                                          onChange={this.onRowInputChange}
                                          placeholder="4"
                                          required/>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Button variant="primary" type="submit"
                                    className="button-style">OK</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <div>{this.drawMatrix(this.state.matrix)}</div>
            </div>
        );
    }
}