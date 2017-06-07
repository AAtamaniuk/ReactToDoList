var React = require('react');
var Task = require('./Task.jsx');

var TaskBoard = React.createClass({
  render: function () {
    var onTaskDelete = this.props.onTaskDelete;
    var onTaskDone = this.props.onTaskDone;
    var tasks = this.props.tasks.map(function (task) {
      return (
        <Task
          key={task.id}
          text={task.text}
          status={task.status}
          onDelete={onTaskDelete.bind(null, task)}
          onDone={onTaskDone.bind(null, task)}
        />
      )
    }.bind(this));
    return <div className="TaskBoard">{tasks}</div>
  }
});

module.exports = TaskBoard;