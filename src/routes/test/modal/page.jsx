import React from 'react'
import { Button, Modal, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { handleClose } from '~/routes/store/reducers/modal/login';

export default function ModalTestPage() {
    const {show} = useSelector((state) => state.showLogin);
    const dispatch = useDispatch();
    console.log(show);
    return (
        <>
        <h1>test page</h1>
        <Modal 
          show={show} 
          onHide={()=>dispatch(handleClose())}
          animation={false}
          size='lg'
          backdrop={false}
          centered={true}
          className='opacity-75'
        >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>dispatch(handleClose())}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>dispatch(handleClose())}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    )
}
