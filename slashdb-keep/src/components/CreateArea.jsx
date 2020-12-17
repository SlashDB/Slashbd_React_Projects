import React, { useState } from 'react';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form>
        <input
          onChange={handleChange}
          name="title"
          placeholder="Task"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Task description..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={(event) => {
            props.addNote(note);
            event.preventDefault();
            setNote({
              title: '',
              content: '',
            });
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
