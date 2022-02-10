import React, { useState, useEffect } from "react";
import Note from "./note";
import noteService from "./noteservice";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
 
   useEffect(() => {
    noteService.getAll()
      .then(res => {
        setNotes(res)
      })
  }, [])

  useEffect(()=>{
    console.log(notes)
  }, [notes])

  
  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    console.log("og note", note)
    
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        console.log("response", returnedNote)
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
  }

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() > 0.5,
    };

    noteService.create(noteObject)
      .then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };
  
  const deleteNote = (id) => {
    noteService.deleteNote(id)
     .then(deletedNote => {
        setNotes(notes.filter(n => n.id !== id))
    }).catch(error => {
      setNotes(notes.filter(n => n.id !== id))
      alert(
        'Note already deleted'
      )
    })
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => {
          return(
          <Note
            key={note.date}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        )})}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};
export default App;