import React from 'react';
import Modal from '@mui/material/Modal';

function CustomModal({ open, onClose, children }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center", // center the modal content vertically and horizontally
          backdropFilter: "blur(10px)", // Adjust the blur intensity as needed
          WebkitBackdropFilter: "blur(10px)", // For Safari support,
        //   background: "rgba(0,0,0, 0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minWidth: "70%",
            maxWidth: "1000px",
            maxHeight: "90vh",
            overflow: "hidden",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
            background: "rgba(255,255,255, 0.9)",
            borderRadius: "10px",
            marginRight:'10px',
            marginLeft: '10px'
          }}
        >
        <div style={{ padding: "20px", flex: 1, overflow: 'auto' }}>
          {children}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default CustomModal;
