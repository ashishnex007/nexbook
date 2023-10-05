import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import "../components_css/noteitem.css";
import ViewEditNoteModal from "./ViewEditNoteModal"; 

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { note } = props;

  const [viewEditModal, setViewEditModal] = useState(false);

  const openViewEditModal = () => {
    setViewEditModal(true);
    document.body.classList.add("active-modal");
  };

  const closeViewEditModal = () => {
    setViewEditModal(false);
    document.body.classList.remove("active-modal");
  };

  const limitCharacters = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  };

  const formatText = (text, maxCharacters, maxLines) => {
    const lines = text.split('\n');
    let formattedText = lines.slice(0, maxLines).join('\n');
    if (formattedText.length > maxCharacters) {
      formattedText = formattedText.substring(0, maxCharacters) + '...';
    }

    return formattedText;
  };

  return (
    <>
      <div
        className="note-item-container"
        onClick={() => openViewEditModal()}
      >
        <div id="cards">
          <div className="card">
            <div className="card-content">
              <div className="card-info-wrapper">
                <div className="card-info">
                  <div className="card-info-title">
                    <h3 >{limitCharacters(note.title, 16)}</h3>
                    <h4 className="ellipsis">{formatText(note.description, 20, 4)}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {viewEditModal && (
        <ViewEditNoteModal
          note={note}
          closeViewEditModal={closeViewEditModal}
        />
      )}
    </>
  );
};

export default Noteitem;
