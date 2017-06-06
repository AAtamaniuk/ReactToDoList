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

  handleTaskDone: function (task) {
    var newTasks = this.state.tasks.slice();
    newTasks.map(function (el) {
      if (el.id === task.id) {
        el.status = "done"
      }
    });
    this.setState({tasks: newTasks});
  },

  render: function () {
    return (
      <div className="ToDoApp">
        <Input onTaskAdd={this.handleTaskAdd}/>
        <TaskBoard tasks={this.state.tasks}
                   onTaskDelete={this.handleTaskDelete}
                   onTaskDone={this.handleTaskDone}
        />
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

var Controls = React.createClass({
  render: function () {
    var filtersButtons = ["All", "New", "Completed"];
    return (
      <ul className="Filters">
        {
          filtersButtons.map(function (name) {
            return (
            <li
              key={name}
              className="Filters__button"
              onClick={console.log(name)
              }
            >
              {name}
            </li>
            );
          })
        }
        {/*<li className="Filters__button">All</li>
        <li className="Filters__button">New</li>
        <li className="Filters__button">Completed</li>*/}
      </ul>
    );
  }
});


ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point')
);