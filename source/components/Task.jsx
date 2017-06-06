var React = require('react');

var Task = React.createClass({
  render: function () {
    return (
      <div className="Task">
        <span className={"Task__checkbox " + this.props.status} onClick={this.props.onDone}/>
        <span className="Task__text">{this.props.text}</span>
        <span className="Task__delete" onClick={this.props.onDelete}>&#10006;</span>
      </div>
    );
  }
});

module.exports = Task;