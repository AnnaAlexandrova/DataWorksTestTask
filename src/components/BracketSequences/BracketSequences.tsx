import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import "../App.css";

type BracketSequencesProps = {};

type BracketSequencesState = {
    inputExpression: string;
    resultMessage: string;
};

export class BracketSequences extends React.Component<BracketSequencesProps, BracketSequencesState> {
    state: BracketSequencesState;

    constructor(props: BracketSequencesProps) {
        super(props);

        this.state = {
            inputExpression: "",
            resultMessage: ""
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    inputValidate(inputData: string): boolean {
        return inputData.trim().length > 0;
    }

    onInputChange(event: React.FormEvent) {
        const inputText = event.target as HTMLInputElement;

        this.setState({inputExpression: inputText.value});
    }

    onSubmit(event: React.FormEvent) {
        event.preventDefault();

        const expression: string = this.state.inputExpression;

        if (!this.inputValidate(expression)) {
            return;
        }

        let count1: number = 0;
        let isOpened1: boolean = false;
        let count2: number = 0;
        let isOpened2: boolean = false;
        let count3: number = 0;
        let isOpened3: boolean = false;
        let count4: number = 0;
        let isOpened4: boolean = false;

        let commonCount: number = 0;
        let hasError: boolean = false;

        for (let i = 0; i < expression.length; i++) {
            switch (expression.charAt(i)) {
                case '(':
                    count1++;
                    commonCount++;
                    isOpened1 = true;
                    break;
                case '{':
                    count2++;
                    commonCount++;
                    isOpened2 = true;
                    break;
                case '<':
                    count3++;
                    commonCount++;
                    isOpened3 = true;
                    break;
                case '[':
                    count4++;
                    commonCount++;
                    isOpened4 = true;
                    break;
                case ')':
                    count1--;
                    commonCount++;
                    if (!isOpened1) {
                        hasError = true;
                    } else {
                        isOpened1 = false;
                    }
                    break;
                case '}':
                    count2--;
                    commonCount++;
                    if (!isOpened2) {
                        hasError = true;
                    } else {
                        isOpened2 = false;
                    }
                    break;
                case '>':
                    count3--;
                    commonCount++;
                    if (!isOpened3) {
                        hasError = true;
                    } else {
                        isOpened3 = false;
                    }
                    break;
                case ']':
                    count4--;
                    commonCount++;
                    if (!isOpened4) {
                        hasError = true;
                    } else {
                        isOpened4 = false;
                    }
                    break;
            }
        }

        if (commonCount === 0) {
            this.setState({
                resultMessage: "В данном выражении нет скобок",
                inputExpression: ""
            });
        } else if (!hasError && count1 === 0 && count2 === 0
            && count3 === 0 && count4 === 0) {
            this.setState({
                resultMessage: "Скобочная структура сбалансированна",
                inputExpression: ""
            });
        } else {
            this.setState({
                resultMessage: "Скобочная структура не сбалансированна",
                inputExpression: ""
            });
        }
    }

    render() {
        return (
            <div className="content-style">
                <Form className="form-style" onSubmit={this.onSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="8">
                            <Form.Label>
                                Введите выражение для проверки сбалансированности скобочной структуры
                            </Form.Label>
                            <Form.Control type="text" value={this.state.inputExpression}
                                          onChange={this.onInputChange}
                                          placeholder=" ( { 1 + 3 } [ 4 + < 3 - 5 > ] ) "
                                          required/>
                        </Form.Group>
                        <Col>
                            <Button variant="primary" type="submit"
                                    className="button-style">Проверить</Button>
                        </Col>
                    </Form.Row>
                </Form>
                <div>{this.state.resultMessage}</div>
            </div>
        );
    }
}