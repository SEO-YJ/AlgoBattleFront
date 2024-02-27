import './RoomList.css'
import React from "react";
import RoomItem from "./RoomItem";
import { Container, Row } from "react-bootstrap";

export default function RoomList({ roomList }) {
  return (
    <Container className="roomList">
      <Row lg={3} md={2} sm={1} xs={1} className="g-3">
        {[...roomList].reverse().map((room) => (
          // TODO 실제 데이터를 넣게 되면 key 수정
          <RoomItem key={room._id} room={room} />
        ))}
      </Row>
    </Container>
  );
}
