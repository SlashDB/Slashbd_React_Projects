import React, { useState } from 'react';
import Name from './Name';
import Task from './Task';
import { useDataDiscovery, useExecuteQuery } from './../hooks';

const List = (props) => {
  const { TaskListId, list, getList, putList, deleteList } = props;
  const [task, setTask] = useState('');

  const location = ['TaskList', 'TaskListId', `${TaskListId}`];

  const [
    tasks,
    getTasks,
    postTask,
    putTask,
    deleteTask,
  ] = useDataDiscovery('taskdatadb', [
    'TaskItem',
    'TaskListId',
    `${list.TaskListId}`,
  ]);

  const [queryData, executeMyQuery] = useExecuteQuery(
    'get',
    'percent-complete',
    {
      TaskListId: `${TaskListId}`,
    }
  );
  console.log(queryData);
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
    padding: '7.5px',
    margin: '10px',
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
    outline: 'none',
    lineHeight: '160%',
    backgroundColor: '#eeeeee',
    color: 'rgb(0,175,239)',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
  };

  const removeButtonStyle = {
    display: 'inline',
    outline: 'none',
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
    <div style={listWrapper}>
      <div style={listHeadWrapper}>
        <Name
          style={{ fontSize: '1.2rem' }}
          className="field"
          fieldName="Name"
          fieldValue={list.Name}
          update={putList}
          location={location}
          get={getList}
        ></Name>
        <button
          style={removeButtonStyle}
          onClick={async () => {
            await deleteTask(['TaskItem', 'TaskListId', `${list.TaskListId}`]);
            await deleteList(['TaskList', 'TaskListId', `${TaskListId}`]);
            await getList();
          }}
        >
          Delete
        </button>
        <button
          style={removeButtonStyle}
          onClick={async () => {
            executeMyQuery();
            alert(queryData ? queryData[0].Value : 'wait');
          }}
        >
          Query
        </button>
      </div>

      {tasks.map((task) => (
        <Task
          key={task.TaskItemId}
          task={task}
          getTasks={getTasks}
          putTask={putTask}
          deleteTask={deleteTask}
        />
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
          onClick={async () => {
            await postTask(['TaskItem'], {
              Task: task ? task : 'new task',
              TaskListId: list.TaskListId,
              Checked: 0,
            }).then(getTasks());
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
