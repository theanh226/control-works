import React, { Component } from 'react';


class Search extends Component {
  render() {
    return (
    <tr >
        <td className="align-baseline">1</td>
        <td >Học lập trình</td>
        <td className="text-center">
            <span className="label label-success">
                       Active
                    </span>
        </td>
        <td className="text-center">
            <button type="button" className="btn btn-warning">
                <span className="fa fa-pencil mr-2"></span>Adjust
            </button>
            &nbsp;
            <button type="button" className="btn btn-danger">
                <span className="fa fa-trash mr-2"></span>Remove
            </button>
        </td>
    </tr>
    );
  }
}

export default Search;
