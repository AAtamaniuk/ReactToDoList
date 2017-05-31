var TodoApp = React.createClass({
  getInitialState: function () {
    return {
      tasks: []
    }
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

  render: function () {
    return (
      <div className="ToDoApp">
        <Input onTaskAdd={this.handleTaskAdd} />
        <TaskBoard tasks={this.state.tasks} onTaskDelete={this.handleTaskDelete} />
        <Controls />
      </div>
    );
  }
});

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
      status: ''
    };

    this.props.onTaskAdd(newTask);
    this.setState ({text: ''});
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

var TaskBoard = React.createClass({
  render: function () {
    var onTaskDelete = this.props.onTaskDelete;
    var tasks = this.props.tasks.map(function (task) {
      return (
        <Task
          key={task.id}
          text={task.text}
          status={task.status}
          onDelete={onTaskDelete.bind(null, task)}
        />
      )
    }.bind(this));
    return <div className="TaskBoard">{tasks}</div>
  }
});

var Task = React.createClass({
  render: function () {
    return (
        <div className="Task">
          <span className="Task__checkbox"/>
          <span className="Task__text">{this.props.text}</span>
          <span className="Task__delete" onClick={this.props.onDelete}>&#10006;</span>
        </div>
    );
  }
});

var Controls = React.createClass({
  render: function () {
    return (
      <div className="Controls">
        <div className="Controls__filter">All</div>
        <div className="Controls__filter">New</div>
        <div className="Controls__filter">Completed</div>
      </div>
    );
  }
});


ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point')
);