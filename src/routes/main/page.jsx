import "./page.css";
import React, { useCallback, useEffect, useState } from "react";
import Search from "./search/Search";
import RoomList from "./rooms/RoomList";
import { useSelector } from "react-redux";
import CreateRoom from "../modal/room/create/create";
import io from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL);

export default function MainPage() {
  const [roomList, setRoomList] = useState([]); //오타있어서 수정해드렸어여
  const { handle } = useSelector((state) => state.user.user);
  const [show, setShow] = useState(false);

  useEffect(() => {
    //TODO roomList 받아오기
    socket.emit("getsRooms");
    return () => {
      socket.off("gameRooms");
    };
  }, []);
  socket.on("getsRooms", (rooms) => {
    console.log(rooms);
    setRoomList(rooms);
  });
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
      <Search />
      <RoomList roomList={roomList} />
      <div className="createRoom" onClick={() => onClickCreateRoom()}>
        방 생성
      </div>
      {show ? (
        <CreateRoom show={show} cancelShow={cancelShow}></CreateRoom>
      ) : (
        <></>
      )}
    </div>
  );
}
