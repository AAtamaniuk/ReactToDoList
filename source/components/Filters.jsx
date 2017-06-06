var React = require('react');

var Filters = React.createClass({
  render: function () {
    var filtersButtons = ["All", "New", "Completed"];
    var onFilterChange = this.props.onFilterChange;
    var activeFilter = this.props.activeFilter;
    return (
      <ul className="Filters">
        {
          filtersButtons.map(function (name) {
            return (
              <li
                key={name}
                className={"Filters__button " + (name.toLowerCase() === activeFilter ? "active" : "")}
                onClick={onFilterChange.bind(null, name)}
              >
                {name}
              </li>
            )
          })
        }
      </ul>
    );
  }
});

module.exports = Filters;