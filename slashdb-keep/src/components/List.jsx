import React from 'react';

function List(prop) {
  return (
    <button
      key={prop.list.TaskListId}
      className="lists"
      onClick={(e) => {
        prop.getList(prop.list.TaskListId);
        prop.setCurrentList(prop.list.TaskListId);
      }}
    >
      <input
        type="text"
        name="title"
        autoComplete="off"
        value={prop.list.Name}
        onChange={(e) => {
          prop.list.Name = e.target.value;
          prop.putList(prop.list);
        }}
      />
    </button>
  );
}

export default List;
