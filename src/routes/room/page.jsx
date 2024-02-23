import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";

export default function RoomPage() {
  const qTier = "21";
  const user1Tier = "28";
  const user2Tier = "26"; // 동적으로 받아서, 아래선 그냥 정적으로 뿌릴 예정
  //TODO 방을 만든 사람이면 무조건 user1name / imageUrlLeft, user1career을 적용받고, 들어왔으면 2p걸 적용받게 하자
  const imageUrl = `https://d2gd6pc034wcta.cloudfront.net/tier/${qTier}.svg`;
  const imageUrlleft = `https://d2gd6pc034wcta.cloudfront.net/tier/${user1Tier}.svg`;
  const imageUrlright = `https://d2gd6pc034wcta.cloudfront.net/tier/${user2Tier}.svg`;
  const roomName = "방 이름입니다";
  const algoName = "알고리즘";
  const user1Name = "User 1";
  const user2Name = "User 2";
  const user1Career = "12승 3패";
  const user2Career = "15승 1패";
  const position = "1"; //TODO 전부다 동적으로 받아와줘야함
  const navigateTo = useNavigate();
  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);

  const handleReady = () => {
    if (position === "1") {
      setPlayer1Ready(!player1Ready);
    } else if (position === "2") {
      setPlayer2Ready(!player2Ready);
    }
  };

  const handleStart = () => {
    if (player1Ready && player2Ready) {
      navigateTo("/room/game");
    } else {
      alert("두 플레이어 모두 준비 상태가 아닙니다!");
    }
  };
  // TODO: 꼭 필요하다까진 아닌데 시간여유있으면 게임시작할때 효과줘볼수도?

  return (
    <Container className="text-center container-margin-top">
      <Row className="flex-column align-items-center">
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={imageUrl} alt="error" className="image-size" />
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="font-bold-large mt-2">{roomName}</div>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button className="algoBtn" variant="primary">
            {algoName}
          </Button>
        </Col>

        <Row className="mt-4 w-100">
          <Col xs={5} className="d-flex justify-content-start">
            <Card className="p-3 card-custom card-margin-right">
              <div className="d-flex align-items-center mb-3 background-color: white">
                <Image className="image-user" src={imageUrlleft} alt="User 1" />
                <div className="background-color: white">
                  <Card.Title className="card-title-large">
                    {user1Name}
                  </Card.Title>
                </div>
              </div>
              <Card.Text className="card-text-large ">
                전적: {user1Career}
                {/* TODO: 적절한 형식으로 전적을 파싱해야 함.*/}
              </Card.Text>
              <Button
                className={`button-bottom-left ${player1Ready ? "ready" : ""}`}
                variant="secondary"
              >
                Ready
              </Button>
            </Card>
          </Col>

          <Col
            xs={2}
            className="d-flex flex-column align-items-center justify-content-center vs-section"
          >
            VS
            {position === "1" && (
              <Button
                className="algoBtn mt-2"
                variant="primary"
                onClick={handleStart}
              >
                Battle Start
              </Button>
            )}
          </Col>

          <Col xs={5} className="d-flex justify-content-end">
            <Card className="p-3 card-custom card-margin-left">
              <div className="d-flex align-items-center mb-3 background-color: white">
                <Image
                  className="image-user"
                  src={imageUrlright}
                  alt="User 2"
                />
                <div className="background-color: white">
                  <Card.Title className="card-title-large">
                    {user2Name}
                  </Card.Title>
                </div>
              </div>
              <Card.Text className="card-text-large">
                전적: {user2Career}
              </Card.Text>
              <Button
                className={`button-bottom-right ${player2Ready ? "ready" : ""}`}
                variant="secondary"
              >
                Ready
              </Button>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4 w-100">
          <Col className="d-flex justify-content-start">
            <Link to="/">
              <Button className="backBtn">Back</Button>
            </Link>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button className="readyBtn" onClick={handleReady}>
              Ready
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
