import './enter.css'
import React, { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EnterRoom({show, roomPassword, cancelShow, roomId}) {
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

  const onEnter = () => {
    if(roomPassword !== inputPassword){
        alert("비밀번호가 틀립니다. 다시 입력해주세요.");
        return;
    }
    //TODO room player2 업데이트
    navigate(`/room/${roomId}`)
  }

  return (
    <Modal
      show={show}
      className='modalEnter'
      onHide={()=>cancelShow()}
    >
      <ModalHeader closeButton>
        <ModalTitle>Confirm Password</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className='modalEnterText'>방에 입장하기 위해서는 비밀번호 입력이 필요합니다</div>
        <input
          type='password'
          className='modalEnterInput'
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button variant='light' onClick={()=>cancelShow()}>취소</Button>
        <Button onClick={()=>onEnter()}>입장</Button>
      </ModalFooter>
    </Modal>
  )
}
