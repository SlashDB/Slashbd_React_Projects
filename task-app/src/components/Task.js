import React from 'react';
import Name from './Name';
import { fetchWrapper } from './../slashDBwrapper';

const Task = (props) => {
  const { task, getTasks } = props;

  function updateTask(body) {
    return fetchWrapper
      .put(`/TaskItem/TaskItemId/${task.TaskItemId}.json`, body)
      .then(() => getTasks());
  }

  function deleteTask() {
    return fetchWrapper
      .delete(`/TaskItem/TaskItemId/${task.TaskItemId}.json`)
      .then(() => getTasks());
  }

  const taskItemStyle = {
    flexDirection: 'row',
    padding: '5px',
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
        }}
        fieldName="Task"
        fieldValue={task.Task}
        update={updateTask}
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
            updateTask({ Checked: !task.Checked });
          }}
        ></input>
        <button
          style={removeButtonStyle}
          onClick={() => {
            deleteTask();
          }}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default Task;
