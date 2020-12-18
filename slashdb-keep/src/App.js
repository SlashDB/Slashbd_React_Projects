import React, { useState, useEffect, useCallback, Fragment } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';
import List from './components/List';

export default function App() {
  const [lists, setLists] = useState([]);
  const [notes, setNotes] = useState([]);

  const [currentList, setCurrentList] = useState('');
  const [newListName, setNewListName] = useState('');

  const baseUrl = `http://localhost:8000/db/datadb`;
  const jsonEnd = `.json?href=false`;

  const taskList = `/TaskList`;

  const taskItem = `/TaskItem`;

  const TaskListId = `/TaskListId`;

  const TaskItemId = `/TaskItemId`;

  useEffect(() => {
    getLists();
  }, []);

  async function getLists() {
    const url = baseUrl + taskList + jsonEnd;
    await fetch(url)
      .then((response) => response.json())
      .then((json) => setLists(json));
  }

  async function getListNotes(ID) {
    const url = baseUrl + taskItem + TaskListId + `/${ID}` + jsonEnd;
    await fetch(url)
      .then((response) => response.json())
      .then((json) => setNotes(json));
  }

  async function addList(name) {
    const url = baseUrl + taskList + jsonEnd;
    await fetch(url, {
      method: 'POST',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Name: name,
      }),
    }).then(() => {
      getLists();
      getListNotes(lists[lists.length - 1].TaskListId);
    });
  }

  async function deleteList() {
    const url = baseUrl + taskList + TaskListId + `/${currentList}` + jsonEnd;
    await fetch(url, {
      method: 'DELETE',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).then(() => {
      getLists();
      getListNotes(lists[lists.length - 2].TaskListId);
    });
  }

  async function addNote(newNote) {
    const url = baseUrl + taskItem + jsonEnd;
    await fetch(url, {
      method: 'POST',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Note: newNote.content,
        Title: newNote.title,
        TaskListId: currentList,
      }),
    }).then(() => {
      getListNotes(currentList);
    });
  }

  async function deleteNote(id) {
    const url = baseUrl + `/TaskItem/TaskItemId/${id}.json`;
    await fetch(url, {
      method: 'DELETE',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).then(() => {
      getListNotes(currentList);
    });
  }

  async function deleteAllNotes() {
    const url = baseUrl + `/TaskItem/TaskListId/${currentList}` + jsonEnd;
    await fetch(url, {
      method: 'DELETE',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).then(() => {
      deleteList();
    });
  }

  async function putNote(note) {
    const url =
      baseUrl + taskItem + TaskItemId + `/` + note.TaskItemId + jsonEnd;
    await fetch(url, {
      method: 'PUT',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Note: note.Note,
        Title: note.Title,
      }),
    }).then(() => {
      getListNotes(currentList);
    });
  }

  async function putList(list) {
    const url =
      baseUrl + taskList + TaskListId + `/` + list.TaskListId + jsonEnd;
    await fetch(url, {
      method: 'PUT',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Name: list.Name,
      }),
    }).then(() => {
      getLists();
    });
  }
  return (
    <div>
      <Header />
      <div className="listsArea">
        <div>
          <h3>Lists: </h3>
          {lists.map((list, index) => (
            <List
              key={list.TaskListId}
              list={list}
              getList={getListNotes}
              setCurrentList={setCurrentList}
              putList={putList}
            />
          ))}
        </div>
        <div>
          {' '}
          <button
            className="listDelete"
            onClick={() => {
              deleteAllNotes();
            }}
          >
            -
          </button>
          <button
            className="listAdd"
            onClick={() => {
              addList(newListName);
              setNewListName('');
            }}
          >
            +
          </button>
          <input
            placeholder="New list name..."
            className="listName"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
        </div>
      </div>
      <CreateArea addNote={addNote} />
      {notes.map((note) => (
        <Note
          note={note}
          key={note.TaskItemId}
          deleteNote={deleteNote}
          putNote={putNote}
        />
      ))}
      <Footer />
    </div>
  );
}
