var React = require('react');
var Input = require('Input');
var TaskBoard = require('TaskBoard');
var Filters = require('Filters');

var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      tasks: [],
      filter: "all"
    }
  },

  componentDidMount: function () {
    var localTasks = JSON.parse(localStorage.getItem('tasks'));
    localTasks.map(function (task) {
      if (task.status === 'new') {
        task.status = ''
      }
    });
    localTasks && this.setState({tasks: localTasks});
  },

  componentDidUpdate: function () {
    this._updateLocalStorage();
  },

  handleTaskAdd: function (newTask) {
    var newTasks = this.state.tasks.slice();
    newTasks.unshift(newTask);
    this.setState({tasks: newTasks});
  },

  handleTaskDelete: function (task) {
    var taskId = task.id;
    var newTasks = this.state.tasks.filter(function (task) {
      return task.id !== taskId;
    });
    this.setState({tasks: newTasks});
  },

  handleTaskDone: function (task) {
    var newTasks = this.state.tasks.slice();
    newTasks.map(function (el) {
      if (el.id === task.id) {
        el.status = 'completed'
      }
    });
    this.setState({tasks: newTasks});
  },

  handleFilterChange: function (filter) {
    this.setState({filter: filter.toLowerCase()});
  },

  render: function () {
    return (
      <div className="ToDoApp">
        <Input onTaskAdd={this.handleTaskAdd} />
        <TaskBoard
          tasks={this._getDisplayedTasks(this.state.tasks, this.state.filter)}
          onTaskDelete={this.handleTaskDelete}
          onTaskDone={this.handleTaskDone}
        />
        <Filters
          onFilterChange={this.handleFilterChange}
          activeFilter={this.state.filter}
        />
      </div>
    );
  },

  _updateLocalStorage: function () {
    var tasks = JSON.stringify(this.state.tasks);
    localStorage.setItem('tasks', tasks);
  },

  _getDisplayedTasks: function (tasks, filter) {
    if (filter === 'completed') {
      return tasks.filter(function (task) {
          return task.status === filter;
        }
      );
    }
    if (filter === 'new') {
      return tasks.filter(function (task) {
          return task.status === filter;
        }
      );
    }
    return tasks;
  }
});

module.exports = TodoApp;

