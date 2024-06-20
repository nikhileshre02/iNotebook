import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ODcxYTU0N2JiMjBiMGQ4YzlkNzRlIn0sImlhdCI6MTcxODEyNDEyNX0.ZzOuOaxDYDJ2LFeyzOBGJzXN46tH7xT_L76jggpLhdc"
      }
    });
    const json=await response.json(); 
    setNotes(json); 
  };

  // add note
  const AddNote = async (title, description, tag) => {
    // to do api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ODcxYTU0N2JiMjBiMGQ4YzlkNzRlIn0sImlhdCI6MTcxODEyNDEyNX0.ZzOuOaxDYDJ2LFeyzOBGJzXN46tH7xT_L76jggpLhdc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json=await response.json();
    setNotes(notes.concat(json));
  };

  // delete note
  const deleteNote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ODcxYTU0N2JiMjBiMGQ4YzlkNzRlIn0sImlhdCI6MTcxODEyNDEyNX0.ZzOuOaxDYDJ2LFeyzOBGJzXN46tH7xT_L76jggpLhdc",
      }
    });
    // const json =await response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2ODcxYTU0N2JiMjBiMGQ4YzlkNzRlIn0sImlhdCI6MTcxODEyNDEyNX0.ZzOuOaxDYDJ2LFeyzOBGJzXN46tH7xT_L76jggpLhdc",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json =await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes));//doubt
    // client side 
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, AddNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
