import React,{useState,useContext} from "react";
import noteContext from "../context/notes/noteContext"
import "../components_css/noteitem.css";

const Noteitem = (props) => {
  const context = useContext(noteContext)
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="note-item-container">
      <div id="cards" >
        <div className="card">
          <div className="card-content">
            <div className="card-info-wrapper">
              <div className="card-info">
                <div className="card-info-title">
                  <h3>{note.title}</h3>
                  <h4>{note.description}</h4>
                  </div>
                  </div>
                  </div>
                  </div>
                  <div className="icons">
                    <i className="fa-solid fa-trash trash" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square edit" onClick={()=>{updateNote(note)}} ></i>
                  </div>
                </div>
        </div>
    </div>
  );
};

export default Noteitem;
