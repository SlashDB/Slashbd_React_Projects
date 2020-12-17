import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';
// import List from './components/List';

export default function App() {
  const [lists, setLists] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentList, setCurrentList] = useState('');
  const [newList, setNewList] = useState('');
  const [requestData, setRequestData] = useState(new Date());

  useEffect(() => {
    const url = `http://localhost:8000/db/datadb/TaskList.json?href=false`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setLists(json));
  }, [requestData]);

  const getList = useCallback((ID) => {
    const url = `http://localhost:8000/db/datadb/TaskItem/TaskListId/${ID}.json?href=false`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setNotes(json));
  }, []);

  function addList(name) {
    const url = 'http://localhost:8000/db/datadb/TaskList.json';
    fetch(url, {
      method: 'POST',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Name: name,
      }),
    }).then(() => {
      setRequestData(new Date());
    });
  }

  function deleteList() {
    console.log('currentList' + currentList);
    const url = `http://localhost:8000/db/datadb/TaskList/TaskListId/${currentList}.json`;
    fetch(url, {
      method: 'DELETE',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).then(() => {
      setRequestData(new Date());
    });
  }

  function addNote(newNote) {
    const url = 'http://localhost:8000/db/datadb/TaskItem.json';
    fetch(url, {
      method: 'POST',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Note: newNote.content,
        Title: newNote.title,
        TaskListId: currentList,
      }),
    }).then(() => {
      getList(currentList);
    });
  }

  function deleteNote(id) {
    const url = `http://localhost:8000/db/datadb/TaskItem/TaskItemId/${id}.json`;
    fetch(url, {
      method: 'DELETE',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).then(() => {
      getList(currentList);
    });
  }
  return (
    <div>
      <Header />
      <div className="listsArea">
        <h3>Lists: </h3>
        {lists.map((list, index) => (
          <button
            key={list.TaskListId}
            className="lists"
            onClick={(e) => {
              getList(list.TaskListId);
              setCurrentList(list.TaskListId);
            }}
          >
            {list.Name}
          </button>
        ))}

        <button className="listDelete" onClick={deleteList}>
          -
        </button>
        <button
          className="listAdd"
          onClick={() => {
            addList(newList);
            setNewList('');
          }}
        >
          +
        </button>
        <input
          placeholder="New list name..."
          className="listName"
          value={newList}
          onChange={(e) => setNewList(e.target.value)}
        />
      </div>
      <CreateArea addNote={addNote} />
      {notes.map((note, index) => (
        <Note
          key={index}
          id={note.TaskItemId}
          title={note.Title}
          content={note.Note}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}
