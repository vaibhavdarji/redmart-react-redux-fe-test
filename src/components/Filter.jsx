import React, { Component } from 'react';

class Filter extends Component {
  state = {};
  render() {
    // const { onFilterClick, filter: { name, values } = {} } = this.props;
    const { name, values } = this.props.filter;
    return (
      <div className="filter">
        <h5 className="name">{name}</h5>
        <ul className="options">
          {values.map((value, index) => (
            <li key={index}>
              <input
                className="checkbox-custom"
                id={`filter-${name}-${index}`}
                name={`filter-${name}-${index}`}
                type="checkbox"
                onClick={event => this.onClick(event, name, value)}
              />
              <label
                htmlFor={`filter-${name}-${index}`}
                className="checkbox-custom-label"
              >
                {value}
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  onClick(event, filterBy, filter) {
    this.props.onFilterClick(event.target.checked, filterBy, filter);
  }
}

export default Filter;
