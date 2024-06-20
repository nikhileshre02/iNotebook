import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
    const context=useContext(noteContext);
    const {AddNote}=context;
    
    const [note,setNote]=useState({title:"",description:"",tag:"default"})
    const handleClick=(e)=>{
        e.preventDefault();
        AddNote(note.title,note.description,note.tag);
    }
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container my-3">
        <h1>Add a note</h1>
        <form>
          <div class="mb-3">
            <label for="title" class="form-label">
              title
            </label>
            <input
              type="text"
              class="form-control"
              id="title"
              aria-describedby="emailHelp"
              name="title"
              onChange={onChange}
            />
          </div>
          <div class="mb-3">
            <label for="desc" class="form-label">
              description
            </label>
            <input
              type="text"
              class="form-control"
              id="desc"
              name="description"
              onChange={onChange}
            />
          </div>
          <button type="submit" class="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
  )
}

export default AddNote
