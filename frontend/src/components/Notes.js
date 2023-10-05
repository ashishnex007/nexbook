import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import '../components_css/Modal.css';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  const [note, setnote] = useState({ id: '', mtitle: '', mdescription: '' });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal');
  } else {
    document.body.classList.remove('active-modal');
  }

  const updateNote = (currentNote) => {
    setModal(true);
    setnote({
      id: currentNote._id,
      mtitle: currentNote.title,
      mdescription: currentNote.description,
    });
  };

  const handleClick = (e) => {
    editNote(note.id, note.mtitle, note.mdescription);
    setModal(false);
  };

  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote style={{ marginBottom: '20px' }} />
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Edit Note</h2>
            <form>
              <label htmlFor="mtitle">Title</label>
              <br />
              <input
                type="text"
                id="mtitle"
                name="mtitle"
                value={note.mtitle}
                onChange={onChange}
                minLength={3}
                required
              />
              <br />
              <label htmlFor="mdesc">Description</label>
              <br />
              <textarea
                id="mdescription"
                name="mdescription"
                value={note.mdescription}
                onChange={onChange}
                minLength={3}
                required
                rows={5}
              />
            </form>
            <button
              disabled={note.mtitle.length < 3 || note.mdescription.length < 3}
              type="submit"
              value="Submit"
              className="addbtn"
              onClick={handleClick}
            >
              Update Note
            </button>
            <i
              className="fa-regular fa-circle-xmark fa-2xl close-modal"
              onClick={toggleModal}
            ></i>
          </div>
        </div>
      )}
      {notes.length > 0 && <h1 className="somehead">Your Notes</h1>}
      <div className="notes-grid">
        {notes.length === 0 }
        {notes.length > 0 &&
          notes.slice().reverse().map((note) => (
            <div key={note._id} className="notes-grid-item">
              <Noteitem note={note} updateNote={updateNote} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Notes;
