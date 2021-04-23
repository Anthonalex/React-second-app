import "./style.css";

import React from "react";
import { render } from "react-dom";
import { Board } from "./board.jsx";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startBtn: false,
      time: 6,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleStart = () => {
    this.setState({
      startBtn: true,
    });
    let id = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));

      if (this.state.time === 0) {
        clearInterval(id);
      }
    }, 1000);
  };

  handleClick(i) {
    if (!this.state.startBtn) {
      this.handleStart();
    }
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      time: 6,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner || this.state.time <= 0) {
      status = "Winner: " + (winner || (this.state.xIsNext ? "O" : "X"));
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
          <div>
            <p>{this.state.time} Seconds</p>
            <button onClick={this.handleStart} disabled={this.state.startBtn}>
              START
            </button>
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

render(
  <div>
    <Game />
  </div>,
  document.getElementById("root")
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
