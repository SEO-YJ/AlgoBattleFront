import React from "react";
import RoomItem from "./RoomItem";
import { Container, Row } from "react-bootstrap";

export default function RoomList({ roomList }) {
  return (
    <Container>
      <Row lg={4} md={3} sm={2} xs={1}>
        {roomList.map((room, index) => (
          // TODO 실제 데이터를 넣게 되면 key 수정
          <RoomItem key={index} room={room} />
        ))}
      </Row>
    </Container>
  );
}
