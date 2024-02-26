import "./page.css";
import React, { useCallback, useEffect, useState } from "react";
import Search from "./search/Search";
import { tempRoomList } from "./data/tempRoomList";
import RoomList from "./rooms/RoomList";
import { useSelector } from "react-redux";
import CreateRoom from "../modal/room/create/create";
import io from 'socket.io-client'

const socket = io("http://localhost:3000");

export default function MainPage() {
  const [roomList, setRoomList] = useState([]); //오타있어서 수정해드렸어여
  const {handle} = useSelector((state) => state.user.user);
  const [show, setShow] = useState(false);

  // console.log(roomList);

  useEffect(() => {
    //TODO roomList 받아오기
    socket.on("gameRooms", (rooms) => {
      setRoomList(rooms);
    });

    return () => {
      socket.off("gameRooms");
    }
  }, []);

  const cancelShow = useCallback(() => {
    setShow(false);
  },[])

  const onClickCreateRoom = useCallback(() => {
    if(!handle){
      alert("로그인하여 주세요!");
      return;
    }
    setShow(true);
  }, [handle])

  return (
    <div className="mainPage">
      <Search />
      <RoomList roomList={roomList} />
      <div className="createRoom" onClick={()=>onClickCreateRoom()}>방 생성</div>
      {show ? 
        <CreateRoom show={show} cancelShow={cancelShow}></CreateRoom> 
      : <></>}
    </div>
  );
}
