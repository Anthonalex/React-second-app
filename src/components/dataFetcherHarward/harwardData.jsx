import React from "react";
import "./harwardData.css";

export default class HarwardDataFetcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      baseUrl: "https://harvardartmuseums.org/browse?load_amount=30",
      offset: 30,
    };
  }

  componentDidMount() {
    console.log("worked");
    fetch(this.state.baseUrl)
      .then((e) => e.json())
      .then((data) => {
        data.records.map((el) => {
          this.setState((prevState) => ({
            data: [...prevState.data, el],
          }));
          return el;
        });
      });
  }

  handleLoadMore = () => {
    fetch(`${this.state.baseUrl}&offset=${this.state.offset}`)
      .then((e) => e.json())
      .then((data) => {
        data.records.map((el) => {
          this.setState((prevState) => ({
            data: [...prevState.data, el],
            offset: prevState.offset + 1,
          }));
          return el;
        });
      });
  };

  render() {
    return (
      <div>
        <h1>Harward Data Fetcher</h1>
        <div className="harward-data-main-div">
          <RenderApi data={this.state.data} />
        </div>
        <div className="load-more-container">
          <button onClick={this.handleLoadMore}>Load more</button>
        </div>
      </div>
    );
  }
}

function RenderApi({ data }) {
  return data.map((el) => <span key={el.id}>{el.title}</span>);
}
