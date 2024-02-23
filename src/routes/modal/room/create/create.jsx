import './create.css'
import React, { useState } from 'react'
import { Button, FormCheck, FormSelect, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from 'react-bootstrap';
import { levelList } from './levelList';
import { algorithmList } from './algorithmList';

export default function CreateRoom({show, cancelShow}) {
  const [room, setRoom] = useState({
    name : "",
    password: "",
    level : "",
    algorithm : "",
  })
  const [isOpenFree, setIsOpenFree] = useState(true);

  const onCreate = () => {
    if(room.name === "" || room.level === "" || room.algorithm === "" || (!isOpenFree && room.password === "")){
      alert("전부 선택해주세요");
      return;
    }
    //TODO 방 생성 api 연결
  }
  
  return (
    <Modal
      show={show}
      className='modalCreate'
      onHide={()=>cancelShow()}
    >
      <ModalHeader closeButton>
        <ModalTitle>Create Battle Room</ModalTitle>
      </ModalHeader>
      <ModalBody className='modalBody'>
        <div className='createRoomName'>
          <div>방이름</div>
          <input
            value={room.name}
            className='createRoomInput'
            onChange={(e)=>setRoom({...room, name:e.target.value})}
          />
        </div>
        <div className='createRoomOpenFree'>
          <FormCheck
            type='radio'
            name='password'
            label='공개'
            onClick={() => setIsOpenFree(true)}
            defaultChecked
          />
          <FormCheck
            type='radio'
            name='password'
            label='비공개'
            onClick={() => setIsOpenFree(false)}
          />
        </div>
        {!isOpenFree ?
          <input
            type='password'
            className='createRoomInput'
            placeholder='비밀번호 입력해주세요'
            value={room.password}
            onChange={(e) => setRoom({...room, password : e.target.value})}
            style={{width:"100%"}}
          />:
          <></>
        }
        <div className='createRoomLevel'>
          <div className='createRoomLevelText'>난이도</div>
          <div className='createRoomLevelSelection'>
            <FormSelect 
              onChange={(e) => setRoom({...room, level : e.target.value})}
            >
              <option>난이도를 선택해 주세요</option>
              {levelList.map(level => (
                <option value={level.value} key={level.value}>{level.name}</option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className='createRoomLevel'>
          <div className='createRoomLevelText'>알고리즘</div>
          <div className='createRoomLevelSelection'>
            <FormSelect 
              onChange={(e) => setRoom({...room, algorithm : e.target.value})}
            >
              <option>알고리즘을 선택해 주세요</option>
              {algorithmList.map((level, index) => (
                <option value={level.name} key={index}>{level.name}</option>
              ))}
            </FormSelect>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant='light' onClick={()=>cancelShow()}>취소</Button>
        <Button onClick={()=>onCreate()}>생성</Button>
      </ModalFooter>
    </Modal>
  )
}
