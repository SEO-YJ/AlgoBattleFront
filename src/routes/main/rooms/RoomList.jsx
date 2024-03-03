import "./RoomList.css";
import React from "react";
import RoomItem from "./RoomItem";
import { Container, Row } from "react-bootstrap";

export default function RoomList({ roomList }) {
  return (
    <Container className="roomList">
      <Row lg={3} md={2} sm={1} xs={1} className="g-3">
        {[...roomList].reverse().map((room) => (
          <RoomItem key={room._id} room={room} />
        ))}
      </Row>
    </Container>
  );
}
