import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../components_css/Modal.css";
import noteContext from "../context/notes/noteContext";

const ViewEditNoteModal = ({ note, closeViewEditModal }) => {
  const context = useContext(noteContext);
  const { editNote, deleteNote } = context;
  const navigate = useNavigate();

  const [noteData, setNoteData] = useState({
    id: note._id,
    mtitle: note.title,
    mdescription: note.description,
  });

  const handleEditClick = () => {
    editNote(noteData.id, noteData.mtitle, noteData.mdescription);
    closeViewEditModal()
  };

  const handleDeleteClick = () => {
    // Handle delete click
    deleteNote(noteData.id);
    closeViewEditModal();
  };

  const onChange = (e) => {
    setNoteData({ ...noteData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal">
      <div onClick={closeViewEditModal} className="overlay"></div>
      <div className="modal-content">
        <h2>{/* Display "View Note" or "Edit Note" based on the mode */}</h2>
        <form>
          <label htmlFor="mtitle">Title</label>
          <br />
          <input
            type="text"
            id="mtitle"
            name="mtitle"
            value={noteData.mtitle}
            onChange={onChange}
            minLength={3}
            required
            readOnly={!noteData.editMode} // Disable editing if not in edit mode
          />
          <br />
          <label htmlFor="mdesc">Description</label>
          <br />
          <textarea
            id="mdescription"
            name="mdescription"
            value={noteData.mdescription}
            onChange={onChange}
            minLength={3}
            required
            rows={5}
            readOnly={!noteData.editMode} // Disable editing if not in edit mode
          />
        </form>
        {noteData.editMode ? (
          <button
            disabled={noteData.mtitle.length < 3 || noteData.mdescription.length < 3}
            type="submit"
            value="Submit"
            className="addbtn"
            onClick={handleEditClick}
          >
            Save Changes
          </button>
        ) : (
          <>
            <button
              className="addbtn"
              onClick={() => setNoteData({ ...noteData, editMode: true })}
            >
              <i className="fa-solid fa-pencil"></i> Edit Note
            </button>
            <button
              className="addbtn"
              onClick={handleDeleteClick}
            >
              <i className="fa-solid fa-trash"></i> Delete Note
            </button>
          </>
        )}
        <i
          className="fa-regular fa-circle-xmark fa-2xl close-modal"
          onClick={closeViewEditModal}
        ></i>
      </div>
    </div>
  );
};

export default ViewEditNoteModal;
