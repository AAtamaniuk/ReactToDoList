var React = require('react');
var ReactDOM = require('react-dom');
var TodoApp = require('./components/TodoApp.jsx');

ReactDOM.render(
  <TodoApp />,
  document.getElementById('mount-point')
);