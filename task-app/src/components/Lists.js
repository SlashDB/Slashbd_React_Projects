import React from 'react';
import List from './List';

function Lists(props) {
  const { lists, getLists } = props;

  const wrapper = {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  return (
    <div style={wrapper}>
      {lists.map((list) => (
        <List key={list.TaskListId} list={list} getLists={getLists} />
      ))}
    </div>
  );
}
export default Lists;
