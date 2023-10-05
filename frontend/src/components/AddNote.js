import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import CustomAlert from './CustomAlert';

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ mtitle: '', mdescription: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
    document.body.classList.add('active-modal');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove('active-modal');
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.mtitle, note.mdescription);
    setNote({ mtitle: '', mdescription: '' });
    closeModal();
    setAlertMessage('Note added successfully!');
    setAlertColor('green');
    setShowAlert(true);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    <CustomAlert
        message={alertMessage}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        color={alertColor}
      />
    <div className='karma'>
      <button className='addbtn' onClick={openModal}>
        Add Note <i className="fa-solid fa-plus"></i>
      </button>
    </div>

      {isModalOpen && (
        <div className="modal">
          <div onClick={closeModal} className="overlay"></div>
          <div className="modal-content">
            <h2>New Note</h2>
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
                rows={5} // Adjust the number of rows as needed
              />
              <br />
              <button
                disabled={note.mtitle.length < 3 || note.mdescription.length < 3}
                type="submit"
                value="Submit"
                onClick={handleClick}
                className='addbtn'
              >
                Create Note <i className="fa-solid fa-plus"></i>
              </button>
              <i className="fa-regular fa-circle-xmark fa-2xl close-modal" onClick={closeModal}></i>
            </form>
            <br />
          </div>
        </div>
      )}
      
    </>
  );
};

export default AddNote;
