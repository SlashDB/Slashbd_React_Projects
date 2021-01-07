import React, { useState } from 'react';
import { fetchWrapper } from './../slashDBwrapper';
import { useQuery } from './../slashDBwrapper';

export default function NewListArea(props) {
  const { getLists } = props;
  const [listName, setListName] = useState('');

  function postList(body) {
    return fetchWrapper.post(`/TaskList`, body).then(() => getLists());
  }

  const wrapper = {
    width: '100vw',
    margin: 'auto',
  };
  const inputWrapper = {
    width: '300px',
    height: '25px',
    margin: '20px auto',
  };
  const inputStyle = {
    flexGrow: '2',
    width: '70%',
    height: '23px',
    backgroundColor: 'rgba(92, 112, 122, 0.32)',
    border: 'none',
    borderRadius: '10px',
    outline: 'none',
    cursor: 'pointer',
  };
  const buttonWrapper = {
    height: '25px',
    float: 'right',
    backgroundColor: '#00afef',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div style={wrapper}>
      <div style={inputWrapper}>
        <input
          style={inputStyle}
          value={listName}
          placeholder="New List..."
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          style={buttonWrapper}
          onClick={() => {
            postList({ Name: listName ? listName : 'New List' });
            setListName('');
          }}
        >
          Add list
        </button>
      </div>
    </div>
  );
}
