import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";
import axios from "axios";

export default function RoomPage() {
  const roomTier = "13"; // TODO [1]
  const user1Tier = "28";
  const user2Tier = "26"; // [2]동적으로 받아서 써야함 (주안점: 내가 방장이면 user2Tier = 0이어야함!)
  //TODO 방을 만든 사람이면 무조건 user1name / imageUrlLeft, user1career을 적용받고, 들어왔으면 2p걸 적용받게 하자

  const imageUrl = `https://d2gd6pc034wcta.cloudfront.net/tier/${roomTier}.svg`;
  const imageUrlleft = `https://d2gd6pc034wcta.cloudfront.net/tier/${user1Tier}.svg`;
  const imageUrlright = `https://d2gd6pc034wcta.cloudfront.net/tier/${user2Tier}.svg`;
  const roomName = "방 이름입니다";
  const algoName = "랜덤"; // TODO [3]
  const position = "1"; // [4]내가 1P인지 2P인지 알아야함(ready 관리를 위해서)
  const user1Name = "허상진"; //TODO : [5] 내가 만약에 들어온 방이면, user1이 이미 저장되어있어야함.
  const user2Name = "권기현"; // 내가 방장이면, 사람이 들어오기 전까지 NULL이여야하겠죠?
  const user1win = "12";
  const user1lose = "4";
  const user2win = "15"; //TODO [1]~[5]은 전부 방 생성 시에 동적으로 받아와야 하는 값
  const user2lose = "1";
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

  const handleStart = async () => {
    if (player1Ready) {
      try {
        // 알고리즘 이름이 '랜덤'이면 쿼리 문자열을 생성하지 않음
        // TODO 추천알고리즘 api가 오작동하는거같음 queryString에 뭘 넣어도 통랜덤으로 받아오는데?
        const queryString =
          algoName === "랜덤" ? "" : `?aliase=${encodeURIComponent(algoName)}`;

        const response = await axios.get(
          `http://localhost:3000/api/problem/${roomTier}${queryString}`
        );

        const randomProblem = response.data.ploblem;
        const probNum = response.data.ploblemId;
        const qTier = response.data.level;

        navigateTo("/room/game", {
          state: {
            randomProblem,
            probNum,
            qTier,
            position,
            user1Name,
            user2Name,
          }, //TODO 받으면 username도 같이 넘겨줄 예정
        });
      } catch (error) {
        console.error("오류 발생!:", error);
        alert("문제가 발생했어요.");
      }
    } else {
      alert("플레이어가 레디 상태가 아닙니다.");
    }
  };
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
                전적: {`${user1win}승 ${user1lose}패`}
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
                전적: {`${user2win}승 ${user2lose}패`}
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
