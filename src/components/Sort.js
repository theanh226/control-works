import React, { Component } from 'react';


class Sort extends Component {
  render() {
    return (
    <div>
        <div className="dropdown">
        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="true">
            Sort
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li>
            <a role="button">
                <span className="fa fa-sort-alpha-asc pr-5">
                Name A-Z
                </span>
            </a>
            </li>
            <li>
            <a role="button">
                <span className="fa fa-sort-alpha-desc pr-5">
                Name Z-A
                </span>
            </a>
            </li>
            <li role="separator" className="divider"></li>
            <li>
            <a role="button">Status Active</a>
            </li>
            <li>
            <a role="button">Status Deactive</a>
            </li>
        </ul>
        </div>
    </div>
    );
  }
}

export default Sort;
