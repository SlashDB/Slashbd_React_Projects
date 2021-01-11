import React from 'react';
import Name from './Name';

const Task = (props) => {
  const { task, getTasks, putTask, deleteTask } = props;
  const location = ['TaskItem', 'TaskItemId', `${task.TaskItemId}`];

  const taskItemStyle = {
    listStyleType: 'none',
    padding: '7.5px',
    color: 'white',
    margin: '10px',
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-all',
    verticalAlign: 'middle',
  };

  const removeButtonStyle = {
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto',
    lineHeight: '130%',
    outline: 'none',
    border: 'none',
    color: '#d10000',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  };

  const checkStyle = {
    cursor: 'pointer',
    verticalAlign: 'middle',
    margin: 'auto',
    marginRight: '6px',
  };

  return (
    <li style={taskItemStyle} key={task.TaskItemId}>
      <Name
        style={{
          textDecoration: task.Checked ? 'line-through' : 'none',
          fontSize: '1rem',
          height: 'auto',
          margin: 'auto',
        }}
        fieldName="Task"
        fieldValue={task.Task}
        update={putTask}
        location={location}
        get={getTasks}
      ></Name>
      <div
        style={{
          display: 'inline',
          float: 'right',
          verticalAlign: 'middle',
        }}
      >
        <input
          style={checkStyle}
          type="checkbox"
          checked={task.Checked}
          onChange={() => {
            putTask(['TaskItem', 'TaskItemId', `${task.TaskItemId}`], {
              Checked: !task.Checked,
            }).then(getTasks());
          }}
        ></input>
        <button
          style={removeButtonStyle}
          onClick={() => {
            deleteTask(['TaskItem', 'TaskItemId', `${task.TaskItemId}`]).then(
              getTasks()
            );
          }}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default Task;
