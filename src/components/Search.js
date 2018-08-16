import React, { Component } from 'react';


class Search extends Component {
  render() {
    return (
      <div>
        <div className="input-group">
            <input type="text" className="form-control mr-1" placeholder="Nhập từ khóa..." />
            <span className="input-group-btn">
            <button className="btn btn-primary" type="button">
                <span className="fa fa-search mr-2"></span>Search
            </button>
            </span>
        </div>
      </div>

    );
  }
}

export default Search;
