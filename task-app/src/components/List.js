import React, { useState, useEffect } from 'react';
import Name from './Name';
import Task from './Task';
import { fetchWrapper } from './../slashDBwrapper';

const List = (props) => {
  const { list, getLists } = props;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  function getTasks() {
    return fetchWrapper
      .get(`/TaskItem/TaskListId/${list.TaskListId}.json?href=false`)
      .then((data) => setTasks(data));
  }

  function postTask(body) {
    return fetchWrapper.post(`/TaskItem.json`, body).then(() => getTasks());
  }

  function deleteListTasks() {
    fetchWrapper.delete(`/TaskItem/TaskListId/${list.TaskListId}.json`);
    deleteList();
  }

  function updateList(body) {
    return fetchWrapper
      .put(`/TaskList/TaskListId/${list.TaskListId}.json`, body)
      .then(() => getLists());
  }

  function deleteList() {
    return fetchWrapper
      .delete(`/TaskList/TaskListId/${list.TaskListId}.json`)
      .then(() => getLists());
  }

  useEffect(() => {
    getTasks();
  }, []);

  const listWrapper = {
    width: '240px',
    minHeight: '240px',
    margin: '24px',
    float: 'left',
    backgroundColor: 'rgb(0,175,239)',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    color: '#eeeeee',
  };

  const listHeadWrapper = {
    margin: '10px',
    padding: '2px',
  };

  const taskItemStyle = {
    color: 'white',
    padding: '7px',
    margin: '7px',
  };

  const inputStyle = {
    width: '60%',
    backgroundColor: 'rgba(242, 246, 248, 0.32)',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    cursor: 'pointer',
  };

  const addButtonStyle = {
    float: 'right',
    border: 'none',
    lineHeight: '160%',
    backgroundColor: '#eeeeee',
    color: 'rgb(0,175,239)',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  };

  const removeButtonStyle = {
    display: 'inline',
    float: 'right',
    textAlign: 'center',
    verticalAlign: 'middle',
    margin: 'auto',
    lineHeight: '120%',
    border: 'none',
    color: '#d10000',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  };

  return (
    <div style={listWrapper} key={list.TaskListId}>
      <div style={listHeadWrapper}>
        <Name
          style={{ fontSize: '1.2rem' }}
          className="field"
          fieldName="Name"
          fieldValue={list.Name}
          update={updateList}
        ></Name>
        <button
          style={removeButtonStyle}
          onClick={() => {
            deleteListTasks();
          }}
        >
          Delete
        </button>
      </div>

      {tasks.map((task) => (
        <Task task={task} getTasks={getTasks} />
      ))}
      <div style={taskItemStyle}>
        <input
          style={inputStyle}
          value={task}
          placeholder="New Task..."
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
        <button
          style={addButtonStyle}
          onClick={() => {
            postTask({
              Task: task ? task : 'new task',
              TaskListId: list.TaskListId,
              Checked: 0,
            });
            setTask('');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default List;
