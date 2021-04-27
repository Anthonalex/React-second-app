import React from "react";
import "./harwardData.css";

export default class HarwardDataFetcher extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      baseUrl: "https://harvardartmuseums.org/browse?load_amount=30",
      offset: 0,
      filter: "default",
    };
  }

  componentDidMount() {
    this.fetchApi();
  }

  handleLoadMore = () => {
    this.setState((prevState) => ({
      offset: prevState.offset + 30,
    }));
    this.fetchApi();
  };

  fetchApi = () => {
    const url =
      this.state.data.length <= 1
        ? this.state.baseUrl
        : `${this.state.baseUrl}&offset=${this.state.offset}`;

    fetch(url)
      .then((e) => e.json())
      .then((data) => {
        data.records
          .filter((el) => {
            if (
              el.division === this.state.filter ||
              this.state.filter === "default"
            ) {
              return el;
            }
          })
          .map((el) => {
            this.setState((prevState) => ({
              data: [...prevState.data, el],
              offset: prevState.offset + 1,
            }));
            return el;
          });
      });
  };

  handleFilter = (e) => {
    this.setState((prevState) => ({
      filter: e.target.value,
      data: [],
      offset: 0,
    }));
    this.fetchApi();
  };

  render() {
    return (
      <div>
        <h1>Harward Data Fetcher</h1>
        <select
          name="select-division"
          id="division"
          onChange={this.handleFilter}
        >
          <option value="default">Default</option>
          <option value="Asian and Mediterranean Art">
            Asian and Mediterranean Art
          </option>
          <option value="European and American Art">
            European and American Art
          </option>
          <option value="Modern and Contemporary Art">
            Modern and Contemporary Art
          </option>
        </select>
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
  return data.map((el) => (
    <div key={el.id} className="data-item">
      <img src={el.images[0].baseimageurl} className="data-images" />
      <p>
        <b>Object number</b> <br /> {el.objectnumber}
      </p>
      <p>
        <b>Title</b> <br /> {el.title}
      </p>
      <p>
        <b>Division</b> <br /> {el.division}
      </p>
      <p>
        <b>{el.copyright && "Copy Right"}</b> <br /> {el.copyright}
      </p>
    </div>
  ));
}
