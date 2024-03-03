import "./create.css";
import React, { useState } from "react";
import {
  Button,
  FormCheck,
  FormSelect,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { levelList } from "./levelList";
import { algorithmList } from "./algorithmList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import socket from "~/lib/sockets/socket";
import Swal from "sweetalert2";

const createRoom = (room, player1Id) => {
  socket.emit("createRoom", {
    player1_id: player1Id,
    name: room.name,
    password: room.password,
    level: room.level,
    algorithm: room.algorithm,
  });
};

export default function CreateRoom({ show, cancelShow }) {
  const playerId = useSelector((state) => state.user.user._id);
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    name: "",
    password: "",
    level: "",
    algorithm: "",
  });
  const [isOpenFree, setIsOpenFree] = useState(true);

  const onCreate = () => {
    if (
      room.name === "" ||
      room.level === "" ||
      room.algorithm === "" ||
      (!isOpenFree && room.password === "")
    ) {
      Swal.fire({
        icon: "error",
        title: "모든 요소를 선택해주세요",
      });
      return;
    }
    createRoom(room, playerId);
    cancelShow();
    socket.on("getRoomId", (roomId) => {
      navigate(`/room/${roomId}`);
    });
  };

  return (
    <Modal show={show} className="modalCreate" onHide={() => cancelShow()}>
      <ModalHeader closeButton>
        <ModalTitle>Create Battle Room</ModalTitle>
      </ModalHeader>
      <ModalBody className="modalBody">
        <div className="createRoomName">
          <div>방이름</div>
          <input
            value={room.name}
            className="createRoomInput"
            onChange={(e) => setRoom({ ...room, name: e.target.value })}
          />
        </div>
        <div className="createRoomOpenFree">
          <FormCheck
            type="radio"
            name="password"
            label="공개"
            onClick={() => setIsOpenFree(true)}
            defaultChecked
          />
          <FormCheck
            type="radio"
            name="password"
            label="비공개"
            onClick={() => setIsOpenFree(false)}
          />
        </div>
        {!isOpenFree ? (
          <input
            type="password"
            className="createRoomInput"
            placeholder="비밀번호 입력해주세요"
            value={room.password}
            onChange={(e) => setRoom({ ...room, password: e.target.value })}
            style={{ width: "100%" }}
          />
        ) : (
          <></>
        )}
        <div className="createRoomLevel">
          <div className="createRoomLevelText">난이도</div>
          <div className="createRoomLevelSelection">
            <FormSelect
              onChange={(e) => setRoom({ ...room, level: e.target.value })}
            >
              <option>난이도를 선택해 주세요</option>
              {levelList.map((level) => (
                <option value={level.value} key={level.value}>
                  {level.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
        <div className="createRoomLevel">
          <div className="createRoomLevelText">알고리즘</div>
          <div className="createRoomLevelSelection">
            <FormSelect
              onChange={(e) => setRoom({ ...room, algorithm: e.target.value })}
            >
              <option>알고리즘을 선택해 주세요</option>
              {algorithmList.map((level, index) => (
                <option value={level.name} key={index}>
                  {level.name}
                </option>
              ))}
            </FormSelect>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="light" onClick={() => cancelShow()}>
          취소
        </Button>
        <Button onClick={() => onCreate()}>생성</Button>
      </ModalFooter>
    </Modal>
  );
}
