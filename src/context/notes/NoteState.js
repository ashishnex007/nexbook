import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) =>{
    const host = "http://localhost:5000"
    const notesInitial = []
      const [notes,setNotes] = useState(notesInitial)

      //get all notes
      const getNotes=async ()=>{
        const response = await fetch(`${host}/api/notes/fetchNotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "authToken":localStorage.getItem("token")
          }
        });
        const json= await response.json()
        setNotes(json)
      }

      // add a note
      const addNote=async (title,description)=>{
        const response = await fetch(`${host}/api/notes/addNote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "authToken":localStorage.getItem("token")
          },
          body: JSON.stringify({title,description}), 
          });
        const note = await response.json();
        setNotes(notes.concat(note))
      }


      // delete a note
      const deleteNote=async(id)=>{
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "authToken":localStorage.getItem("token")
          } 
          });
        const json = response.json();
        const newNotes= notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
      }


      // edit a note
      const editNote = async (id,title,description)=>{
        //API Call
        const response = await fetch(`${host}/api/notes/editNote/${id}`, {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
            "authToken":localStorage.getItem("token")
          },
          body: JSON.stringify({title,description}), 
          });
        const json = await response.json();
        //client
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            break;
          }
        }
        setNotes(newNotes);
      }

    return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
        {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;