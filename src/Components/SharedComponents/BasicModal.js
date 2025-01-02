import React from 'react';
import { Modal } from 'semantic-ui-react';

export function BasicModal(props) {

    const { show, onClose, title, children, size } = props;

  return (
    <Modal open={show} closeIcon={true} onClose = {onClose} size={size}>
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Content>
            {children}
        </Modal.Content>
    </Modal>
  )
}

BasicModal.defaultProps = {
    size: 'tiny',
  }
