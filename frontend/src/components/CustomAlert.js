import React, { useState, useEffect } from 'react';

const CustomAlert = ({ message, showAlert, setShowAlert, color }) => {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  return (
    showAlert && (
      <div className="alert">
        <span className="fas fa-exclamation-circle"></span>
        <span className="msg">{message}</span>
        <div className="close-btn" onClick={() => setShowAlert(false)}>
          <span className="fas fa-times"></span>
        </div>
      </div>
    )
  );
};

export default CustomAlert;
