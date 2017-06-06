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

ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point')
);