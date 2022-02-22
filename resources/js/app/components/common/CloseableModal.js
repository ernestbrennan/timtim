import { Modal } from '@material-ui/core';
import React from 'react';
import CloseIcon from '$app/icons/CloseIcon';

function CloseableModal({ isOpen, onClose, modalStyle, children, backdropStyle }) {
  return (
    <Modal
      aria-labelledby="Request Form"
      aria-describedby="Send a request to the residential complex developer"
      open={isOpen}
      BackdropProps={{
        style: {
          ...backdropStyle,
        },
      }}
      style={modalStyle}
    >
      <div style={{ outline: 0, height: '100%' }}>
        {onClose && (
          <div
            style={{
              top: 25,
              right: 25,
              position: 'absolute',
              cursor: 'pointer',
              zIndex: 16,
            }}
            onClick={onClose}
          >
            <CloseIcon />
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
}

export default CloseableModal;
