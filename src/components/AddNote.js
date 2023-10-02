import React,{useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setnote] = useState({title:"",description:""})

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note.title,note.description);
        setnote({title:"",description:""})
    }
    const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <form>
          <label htmlFor="title">Title</label><br/>
          <input type="text" id="title" name="title" onChange={onChange} value={note.title} minLength={3} required/><br/>
        <br />
          <label htmlFor="desc">Description</label><br/>
          <input type="text" id="description" name="description" onChange={onChange} value={note.description} minLength={3} required/><br/>
          <button disabled={note.title.length <3 || note.description.length <3} type="submit" value="Submit" onClick={handleClick}>Submit</button>
        </form>
        <br />
    </div>
  )
}

export default AddNote

