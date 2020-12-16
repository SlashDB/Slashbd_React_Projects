import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Note from './components/Note';
import CreateArea from './components/CreateArea';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [requestData, setRequestData] = useState(new Date());

  useEffect(() => {
    const url = 'http://localhost:8000/db/datadb/TaskItem.json?href=false';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setNotes(json));
    console.log(notes);
  }, [requestData]);

  function addNote(newNote) {
    const url = 'http://localhost:8000/db/datadb/TaskItem.json';
    fetch(url, {
      method: 'POST',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify({
        Note: newNote.content,
        Title: newNote.title,
      }),
    }).then(() => {
      setRequestData(new Date());
    });
  }

  function deleteNote(id) {
    const url = `http://localhost:8000/db/datadb/TaskItem/TaskItemId/${id}.json`;
    fetch(url, {
      method: 'DELETE',
      header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    }).then(() => {
      setRequestData(new Date());
    });
  }

  return (
    <div>
      <Header />
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
