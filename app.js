var TodoApp = React.createClass({
  render: function () {
    return (
      <div className="ToDoApp">
        <Input />
        <TaskBoard />
        <Controls />
      </div>
    );
  }
});

var Input = React.createClass({
  render: function () {
    return <input type="text" className="Input" placeholder="Add new task..."/>
  }
});

var TaskBoard = React.createClass({
  render: function () {
    return (
      <div className="TaskBoard">
        <div className="Task">
          <span className="Task__checkbox Task__checkbox--done"/>
          <span className="Task__text">Learn React</span>
          <span className="Task__delete">&#10006;</span>
        </div>
        <div className="Task">
          <span className="Task__checkbox"/>
          <span className="Task__text">Learn Redux</span>
          <span className="Task__delete">&#10006;</span>
        </div>
        <div className="Task">
          <span className="Task__checkbox"/>
          <span className="Task__text">Write some app</span>
          <span className="Task__delete">&#10006;</span>
        </div>
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