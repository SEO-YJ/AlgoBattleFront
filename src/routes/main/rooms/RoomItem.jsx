import './RoomItem.css'
import React from 'react'
import { Col } from 'react-bootstrap'

export default function RoomItem({room}) {
  return (
    <Col className='roomItemContainer'>
      {/* <div className='roomItem'> */}
        {room.title}
      {/* </div> */}
    </Col>
  )
}
