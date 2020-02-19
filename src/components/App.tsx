import React from 'react';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {MyTree} from "./Tree/MyTree";
import {Calendar} from "./Calendar/Calendar";
import {MyArray} from "./Array/MyArray";
import {BracketSequences} from "./BracketSequences/BracketSequences";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="border-style">
                    <MyTree/>
                </div>
                <div className="border-style">
                    <Calendar/>
                </div>
                <div className="border-style">
                    <MyArray/>
                </div>
                <div className="border-style">
                    <BracketSequences/>
                </div>
            </div>
        );
    }
}

