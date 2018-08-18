import React, { Component } from 'react';
import Sort from './Sort';
import Search from './Search';


class Control extends Component {
  render() {
    return (

        <div className="row mt-2">
        {/* Search Component */}
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Search  onSearch={this.props.onSearch} />
        </div>
        {/* Sort Component */}
        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <Sort />
        </div>
      </div>

    );
  }
}

export default Control;
