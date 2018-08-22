import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: ""
    };
  }

  onSearch = event => {
    var target = event.target;
    var name = target.name;
    var value = target.value;

    this.setState({
      [name]: value
    });
  };

  onSearchbtn = () => {
    this.props.onSearch(this.state.keywords);
  };

  render() {
    return (
      <div>
        <div className="input-group">
          <input
            type="text"
            className="form-control mr-1"
            placeholder="Input to search..."
            name="keywords"
            onChange={this.onSearch}
          />
          <span className="input-group-btn">
            <button
              className="btn btn-primary"
              type="button"
              onClick={this.onSearchbtn}
            >
              <span className="fa fa-search mr-2" />
              Search
            </button>
          </span>
        </div>
      </div>
    );
  }
}

export default Search;
