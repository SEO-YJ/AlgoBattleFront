import "./page.css";
import React, { useCallback, useEffect, useState } from "react";
import Search from "./search/Search";
import { tempRoomList } from "./data/tempRoomList";
import RoomList from "./rooms/RoomList";
import { useSelector } from "react-redux";
import CreateRoom from "../modal/room/create/create";

export default function MainPage() {
  const [roomList, setRoomList] = useState(tempRoomList); //오타있어서 수정해드렸어여
  const {bojNickname} = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  useEffect(() => {
    //TODO roomList 받아오기
  }, []);

  const cancelShow = useCallback(() => {
    setShow(false);
  },[])

  const onClickCreateRoom = useCallback(() => {
    if(!bojNickname){
      alert("로그인하여 주세요!");
      return;
    }
    setShow(true);
  }, [bojNickname])

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
