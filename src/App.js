import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';


class App extends Component {
    constructor() {
        super();
        this.state = {
            rows: 0,
            columns: 0,
            bombs: 0,
            data2:
                [
                    {
                        "id": "a",
                        "name": "Foo",
                        "age": "20"
                    },
                    {
                        "id": "b",
                        "name": "Bar",
                        "age": "30"
                    },
                    {
                        "id": "c",
                        "name": "Baz",
                        "age": "40"
                    }
                ]
        }
    }

    draw = (event) => {
        var rows = document.getElementById("rows").value
        var columns = document.getElementById("columns").value
        var bombs = document.getElementById("bombs").value
        this.setState({rows: rows})
        this.setState({columns: columns})
        this.setState({bombs: bombs})
    }

    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <h1>Mine Sweeper</h1>
                    <div className="row">
                        <label>rows:</label>
                        <input type="number" id="rows"/>
                        <label>columns:</label>
                        <input type="number" id="columns"/>
                        <label>bombs:</label>
                        <input type="number" id="bombs"/>
                    </div>
                    <div className="row">
                        <input type="button" onClick={this.draw} value="new game"/>
                    </div>
                </header>
                <content className="App-content">
                    <div>
                        <Board rowsNumber={this.state.rows} columnsNumber={this.state.columns}
                               bombsNumber={this.state.bombs}/>
                    </div>
                </content>
            </div>
        );
    }
}

class Square extends React.Component {
    render() {
        let square;
        if (this.props.value == 9) {
            square = <div className="square">
                {this.props.value}
            </div>;
        } else {
            square = <div className="square">

            </div>;
        }
        return (
            square
        );
    }
}

class Board extends React.Component {

    renderSquare(flag) {
        return <Square value={flag}/>;
    }

    createBoard() {
        if (this.props.rowsNumber * this.props.columnsNumber < this.props.bombsNumber) {
            alert("Số bom phải nhỏ hơn số lượng ô trong m")
            return;
        }
        let table = [];

        var bombsPosition = this.createBombs();

        for (let i = 0; i < this.props.rowsNumber; i++) {
            let children = [];
            for (let j = 0; j < this.props.columnsNumber; j++) {
                if (bombsPosition.has(JSON.stringify({row: i, column: j}))) {
                    children.push(
                        this.renderSquare(9)
                    )
                } else {
                    children.push(
                        this.renderSquare(-1)
                    )

                }
            }
            table.push(<div className="board-row">{children}</div>);
        }
        return table;
    }

    createBombs() {
        var minBombs = 0;
        var bombsPosition = new Set();
        var rows = this.props.rowsNumber;
        var columns = this.props.columnsNumber;
        var bombs = this.props.bombsNumber;

        while (minBombs < bombs) {
            var randomedRow = Math.floor(Math.random() * (rows) + 0);
            var randomedColumn = Math.floor(Math.random() * (columns) + 0);

            var item = JSON.stringify({row: randomedRow, column: randomedColumn});

            if (!bombsPosition.has(item)) {
                bombsPosition.add(item);
                minBombs++;
            }
        }
        for (let item of bombsPosition) {
            var i = JSON.parse(item);
            console.log(i.row + " " + i.column + "\n");
        }
        return bombsPosition;
    }

    render() {
        return (
            <div>
                {this.createBoard()}
            </div>
        );
    }
}


export default App;
