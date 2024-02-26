import './RoomItem.css'
import React, { useCallback, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import EnterRoom from '~/routes/modal/room/enter/enter';

//TODO api을 통해 roomList 받아오게 될 경우, column명 수정
export default function RoomItem({room}) {
  const {handle} = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  
  const cancelShow = useCallback(() => {
    setShow(false);
  },[])

  const enterGame = useCallback(() => {
    if(!handle){
      alert("로그인하여 주세요!");
      return;
    }
    if(room.password){
      //TODO 비번 확인 과정
      setShow(true);
    } else {
      //TODO 실제 데이터 받아올 때, 경로 수정(아마 room._id)
      navigate(`/room/${room._id}`)
    }
  },[room, navigate, handle])

  return (
    <Col className='roomItemContainer'>
      <div className='roomItem' onClick={()=>enterGame()}>
        <div className='roomItemTop'>
          <div className='roomItemTopLeft'>
            <img 
              src={`https://d2gd6pc034wcta.cloudfront.net/tier/${room.level}.svg`}
              style={{width:"35px", height:"35px"}}
            />
            <div className='roomItemTitle'>{room.name}</div>
            <div className='roomItemPlayer'>{room.player1.handle}</div>
          </div>
          {room.password === '' || !room.password ?
            <img src='/src/assets/imgs/unlock.png' style={{width:"20px", height:"25px"}}/>:
            <img src='/src/assets/imgs/lock.png' style={{width:"20px", height:"25px"}}/>
          }
        </div>
        <div className='roomItemBottom'>
          <div className='roomItemBottomLeft'>
            <div className='roomItemBtn'>{room.algorithm}</div>
            <div className='roomItemBtn white'>{room.status}</div> 
          </div>
          <div className='roomItemPerson'>
            {room.state === "모집중" ? ('1/2') : ('2/2')}
          </div>
        </div>
      </div>
      {show ? 
        <EnterRoom show={show} roomPassword={room.password} cancelShow={cancelShow} roomId={room._id}></EnterRoom> 
      : <></>}
    </Col>
  )
}
