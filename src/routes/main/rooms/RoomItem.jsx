import './RoomItem.css'
import React from 'react'
import { Col } from 'react-bootstrap'

//TODO api을 통해 roomList 받아오게 될 경우, column명 수정
export default function RoomItem({room}) {
  return (
    <Col>
      <div className='roomItem'>
        <div className='roomItemTop'>
          <div className='roomItemTopLeft'>
            <img 
              src={`https://d2gd6pc034wcta.cloudfront.net/tier/${room.tier}.svg`}
              style={{width:"35px", height:"35px"}}
            />
            <div className='roomItemTitle'>{room.title}</div>
            <div className='roomItemPlayer'>{room.player1}</div>
          </div>
          {room.password === undefined ?
            <img src='/src/assets/imgs/unlock.png' style={{width:"20px", height:"25px"}}/>:
            <img src='/src/assets/imgs/lock.png' style={{width:"20px", height:"25px"}}/>
          }
        </div>
        <div className='roomItemBottom'>
          <div className='roomItemBottomLeft'>
            <div className='roomItemBtn'>{room.category}</div>
            <div className='roomItemBtn white'>{room.state}</div>
          </div>
          <div className='roomItemPerson'>
            {room.state === "모집중" ? ('1/2') : ('2/2')}
          </div>
        </div>
      </div>
    </Col>
  )
}
