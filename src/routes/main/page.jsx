import "./page.css";
import React, { useEffect, useState } from "react";
import Search from "./search/Search";
import { tempRoomList } from "./data/tempRoomList";
import RoomList from "./rooms/RoomList";
import ModalLogin from "../modal/login/login";

export default function MainPage() {
  const [roomList, setRoomList] = useState(tempRoomList); //오타있어서 수정해드렸어여

  useEffect(() => {
    //TODO roomList 받아오기
  }, []);

  return (
    <div className="mainPage">
      <Search />
      <RoomList roomList={roomList} />
      <ModalLogin/>
    </div>
  );
}
