import React, { useContext, useEffect, useRef,useState} from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  useEffect(() => {
    getNotes();
  }, []);

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description});
  };
  const ref = useRef(null);
  const refclose=useRef(null);

  // form functions
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",tag:"default"})
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const saveNote=(e)=>{
    e.preventDefault();
    editNote(note.id,note.etitle,note.edescription,note.tag);
    refclose.current.click();
  }

  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      ></button>
      <AddNote />
      <div class="modal" id="exampleModal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Note</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* form */}
              <form>
                <div class="mb-3">
                  <label for="etitle" class="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="etitle"
                    aria-describedby="emailHelp"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div class="mb-3">
                  <label for="edescription" class="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  Add Note
                </button>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button type="button" class="btn btn-primary" onClick={saveNote}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-3">
        <h2>Notes</h2>
        {notes.map((note) => {
          return <Noteitem note={note} updateNote={updateNote} />;
        })}
      </div>
    </>
  );
}

export default Notes;
