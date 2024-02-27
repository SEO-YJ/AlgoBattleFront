import './RoomItem.css'
import React, { useCallback, useState } from 'react'
import { Col } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import socket from '~/lib/sockets/socket';
import EnterRoom from '~/routes/modal/room/enter/enter';

//TODO api을 통해 roomList 받아오게 될 경우, column명 수정
export default function RoomItem({room}) {
  const {handle, _id} = useSelector((state) => state.user.user);
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
    if(room.player2){
      alert("제한 인원 초과입니다.")
      return;
    }
    if(room.password){
      setShow(true);
    } else {
      //TODO room player2 업데이트
      socket.emit("enterPlayer", {
        roomId : room._id,
        player2_Id : _id,
        handle : handle
      })
      socket.on("enterRoomId", (roomId) => {
        // console.log(roomId);
        navigate(`/room/${roomId}`)
      })
    }
  },[room, navigate, handle, _id])

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
            {room.player2 === null ? ('1/2') : ('2/2')}
          </div>
        </div>
      </div>
      {show ? 
        <EnterRoom show={show} roomPassword={room.password} cancelShow={cancelShow} roomId={room._id}></EnterRoom> 
      : <></>}
    </Col>
  )
}
