import './page.css'
import React, { useEffect, useState } from 'react'
import Search from './search/Search'
import { tempRoomList } from './data/tempRoomList';
import RoomList from './rooms/RoomList';

export default function MainPage() {
  const [roomList, setRoonList] = useState(tempRoomList);

  useEffect(()=>{
    //TODO roomList 받아오기
  },[])

  return (
    <div className='mainPage'>
      <Search/>
      <RoomList roomList={roomList}/>
    </div>
  )
}
