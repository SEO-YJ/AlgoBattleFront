import "./page.css";
import React, { useCallback, useEffect, useState } from "react";
import Search from "./search/Search";
import RoomList from "./rooms/RoomList";
import { useSelector } from "react-redux";
import CreateRoom from "../modal/room/create/create";
import socket from "~/lib/sockets/socket";

export default function MainPage() {
  const [roomList, setRoomList] = useState([]);
  const {handle} = useSelector((state) => state.user.user);
  const [show, setShow] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    status : "",
    algorithm : ""
  })
  const [viewRoomList, setViewRoomList] = useState([]);

  useEffect(() => {
    socket.emit("getRooms");

    socket.on("getsRooms", (rooms) => {
      // console.log(rooms);
      setRoomList(rooms);
    });

    return () => {
      socket.off("getRooms");
    }
  }, []);

  const changeSearchCondition = (condition) => {
    setSearchCondition(condition);
  }

  useEffect(()=>{
    setViewRoomList(roomList.filter(room => {
      if(searchCondition.status === "" && searchCondition.algorithm === ""){
        return room;
      } else if(searchCondition.status === ""){
        return room.algorithm === searchCondition.algorithm
      } else if(searchCondition.algorithm === ""){
        return room.status === searchCondition.status
      } else {
        return room.algorithm === searchCondition.algorithm && room.status === searchCondition.status
      }
    }))
  },[roomList, searchCondition])

  const cancelShow = useCallback(() => {
    setShow(false);
  }, []);

  const onClickCreateRoom = useCallback(() => {
    if (!handle) {
      alert("로그인하여 주세요!");
      return;
    }
    setShow(true);
  }, [handle]);

  return (
    <div className="mainPage">
      <Search changeSearchCondition={changeSearchCondition}/>
      <RoomList roomList={viewRoomList} />
      <div className="createRoom" onClick={()=>onClickCreateRoom()}>방 생성</div>
      {show ? 
        <CreateRoom show={show} cancelShow={cancelShow}></CreateRoom> 
      : <></>}
    </div>
  );
}
