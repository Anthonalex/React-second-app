import React from "react";
import "./simpleCalc.css";

export default class Calc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstInputValue: 0,
      secondInputValue: 0,
      value: 0,
    };
  }

  handleFirstChange = (e) => {
    this.setState({
      firstInputValue: Number(e.target.value),
    });
  };

  handleSecondChange = (e) => {
    this.setState({
      secondInputValue: Number(e.target.value),
    });
  };

  handleInc = () => {
    const res = this.state.firstInputValue + this.state.secondInputValue;
    this.setState({
      value: res,
    });
  };

  handleDec = () => {
    const res = this.state.firstInputValue - this.state.secondInputValue;
    this.setState({
      value: res,
    });
  };

  handleMul = () => {
    const res = this.state.firstInputValue * this.state.secondInputValue;
    this.setState({
      value: res,
    });
  };

  handleDiv = () => {
    const res = this.state.firstInputValue / this.state.secondInputValue;
    this.setState({
      value: res,
    });
  };

  handleReset = () => {
    this.setState({
      value: 0,
    });
  };
  render() {
    return (
      <div className="calc-div">
        <h1>Simple Calc</h1>
        <br />
        <input
          type="number"
          className="calc-input"
          onChange={this.handleFirstChange}
        />
        <button onClick={this.handleInc}>+</button>
        <button onClick={this.handleDec}>-</button>
        <button onClick={this.handleMul}>*</button>
        <button onClick={this.handleDiv}>/</button>
        <input
          type="number"
          className="calc-input"
          onChange={this.handleSecondChange}
        />
        =
        <input
          type="number"
          disabled={true}
          className="calc-input"
          value={this.state.value}
        />
        <br />
        <button onClick={this.handleReset}>Reset</button>
      </div>
    );
  }
}

