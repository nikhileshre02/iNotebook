import React,{useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
  const context=useContext(noteContext);
  const {deleteNote}=context;
  const {note,updateNote}=props;
  return (
    <div>
      <div className="card my-3 d-flex">
        <div className="card-title" style={{'width':'200px'}}>
          <h5>{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i class="fa-solid fa-trash mx-2" onClick={()=>{
            deleteNote(note._id)
          }}></i>
          <i class="fa-solid fa-pen-to-square mx-2" onClick={()=>{
            updateNote(note)
          }}></i>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
