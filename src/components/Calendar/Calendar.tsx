import React from "react";
import {Button, Form, Col} from "react-bootstrap";
import "./Calendar.css";
import "../App.css";

type CalendarProps = {};

type CalendarState = {
    inputYear: string;
    inputMonth: string;
    inputDay: string;
    year: number;
    month: number;
    day: number;
};

export class Calendar extends React.Component<CalendarProps, CalendarState> {
    constructor(props: CalendarProps) {
        super(props);

        this.state = {
            inputYear: "",
            inputMonth: "",
            inputDay: "",
            year: 0,
            month: 0,
            day: 0
        };

        this.onInputYearChange = this.onInputYearChange.bind(this);
        this.onInputMonthChange = this.onInputMonthChange.bind(this);
        this.onInputDayChange = this.onInputDayChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createCalendar = this.createCalendar.bind(this);
    }

    onInputYearChange(event: React.FormEvent) {
        const inputText = event.target as HTMLInputElement;

        this.setState({inputYear: inputText.value});
    }

    onInputMonthChange(event: React.FormEvent) {
        const inputText = event.target as HTMLInputElement;

        this.setState({inputMonth: inputText.value});
    }

    onInputDayChange(event: React.FormEvent) {
        const inputText = event.target as HTMLInputElement;

        this.setState({inputDay: inputText.value});
    }

    dateValidate(year: number, month: number, day: number): boolean {
        return !isNaN(year) || !isNaN(month) || !isNaN(day);
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        const yearVal: number = Number(this.state.inputYear);
        const monthVal: number = Number(this.state.inputMonth);
        const dayVal: number = Number(this.state.inputDay);

        if (this.dateValidate(yearVal, monthVal, dayVal)) {
            this.setState({
                inputYear: "",
                inputMonth: "",
                inputDay: "",
                year: yearVal,
                month: monthVal,
                day: dayVal
            });
        } else {
            alert("Введены некорректные данные");

            this.setState({
                inputYear: "",
                inputMonth: "",
                inputDay: ""
            });
        }
    }

    createCalendar(year: number, month: number, day: number) {
        let date: Date = new Date(year, month - 1);

        let table: string = "<table><thead>" +
            "<tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr>" +
            "</thead><tbody><tr>";

        for (let i = 0; i < this.getDay(date); i++) {
            table += "<td></td>";
        }

        while (date.getMonth() === month - 1) {
            if (date.getDate() === day) {
                table += "<td style='background: royalblue; color: #E6E6E6;'>" + date.getDate() + "</td>";
            } else {
                table += "<td>" + date.getDate() + "</td>";
            }

            if (this.getDay(date) % 7 === 6) {
                table += "</tr><tr>";
            }

            date.setDate(date.getDate() + 1);
        }

        if (this.getDay(date) !== 0) {
            for (let i = this.getDay(date); i < 7; i++) {
                table += "<td></td>";
            }
        }

        table += "</tr></tbody></table>";

        return <div dangerouslySetInnerHTML={{__html: table}}/>;
    }

    getDay(date: Date): number {
        let day: number = date.getDay();

        if (day === 0) day = 7;
        return day - 1;
    }

    render() {
        return (
            <div className="content-style">
                <Form className="form-style" onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Введите год</Form.Label>
                            <Form.Control type="text"
                                          value={this.state.inputYear}
                                          onChange={this.onInputYearChange}
                                          placeholder="2020"
                                          required/>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Введите месяц</Form.Label>
                            <Form.Control type="text"
                                          value={this.state.inputMonth}
                                          onChange={this.onInputMonthChange}
                                          placeholder="01"
                                          required/>
                        </Form.Group>
                        <Form.Group as={Col} md="3">
                            <Form.Label>Введите день</Form.Label>
                            <Form.Control type="text"
                                          value={this.state.inputDay}
                                          onChange={this.onInputDayChange}
                                          placeholder="10"
                                          required/>
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Button variant="primary" type="submit"
                                    className="button-style">OK</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>

                <div>{this.createCalendar(this.state.year, this.state.month, this.state.day)}</div>
            </div>
        );
    }
}