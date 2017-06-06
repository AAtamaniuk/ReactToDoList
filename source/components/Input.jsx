var React = require('react');

var Input = React.createClass({
  getInitialState: function () {
    return {
      text: ''
    }
  },

  handleTaskAdd: function () {
    var newTask = {
      id: Date.now(),
      text: this.state.text,
      status: 'new'
    };

    this.props.onTaskAdd(newTask);
    this.setState({text: ''});
  },

  handleTextChange: function (event) {
    this.setState({text: event.target.value})
  },

  render: function () {
    return (
      <div className="AddTask">
        <input type="text"
               className="AddTask__input"
               placeholder="Add new task..."
               onChange={this.handleTextChange}
               value={this.state.text}
        />
        <button className="AddTask__button" type="button" onClick={this.handleTaskAdd}>Add</button>
      </div>
    )

  }
});

module.exports = Input;

