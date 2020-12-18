import React from 'react';

function Note(prop) {
  return (
    <div className="note">
      <h1>
        <input
          type="text"
          name="name"
          value={prop.note.Title}
          onChange={(e) => {
            prop.note.Title = e.target.value;
            prop.putNote(prop.note);
          }}
        />
      </h1>
      <textarea
        name="task"
        rows="5"
        value={prop.note.Note}
        onChange={(e) => {
          prop.note.Note = e.target.value;
          prop.putNote(prop.note);
        }}
      />
      <button
        onClick={() => {
          prop.deleteNote(prop.note.TaskItemId);
        }}
      >
        DELETE
      </button>
    </div>
  );
}

export default Note;
