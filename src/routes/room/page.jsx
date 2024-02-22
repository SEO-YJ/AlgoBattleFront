import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";

export default function RoomPage() {
  /* 입장하는 순간, 각 유저의 Tier, 닉네임, 전적 + 방 이름, 알고리즘 이름을 받아오게 해야 함 */
  const imageUrl = "https://d2gd6pc034wcta.cloudfront.net/tier/27.svg";
  const imageUrlleft = "https://d2gd6pc034wcta.cloudfront.net/tier/28.svg";
  const imageUrlright = "https://d2gd6pc034wcta.cloudfront.net/tier/26.svg"; // tier/$(usertier).svg가 되겠죠?
  const roomName = "방 이름입니다";
  const algoName = "알고리즘";
  const user1Name = "User 1";
  const user2Name = "User 2";
  const user1Career = "12승 3패";
  const user2Career = "15승 1패";
  const position = "1"; // Todo: 이 값들을 전부다 동적으로 받아오게 수정.
  // position = user1이면 1p, user2이면 2p로

  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false);

  const handleReady = () => {
    if (position === "1") {
      setPlayer1Ready(!player1Ready);
    } else if (position === "2") {
      setPlayer2Ready(!player2Ready);
    }
  };
  // 어떤 플레이어가 들어오든 대응할수 있도록 상태관리를 해줄 예정

  return (
    <Container className="text-center container-margin-top">
      <Row className="flex-column align-items-center">
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={imageUrl} alt="error" className="image-size" />
          {/*Todo:동적*/}
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="font-bold-large mt-2">{roomName}</div> {/*Todo:동적*/}
        </Col>
        <Col className="d-flex justify-content-center">
          <Button className="algoBtn" variant="primary">
            {algoName} {/*Todo:동적*/}
          </Button>
        </Col>

        <Row className="mt-4 w-100">
          <Col xs={5} className="d-flex justify-content-start">
            <Card className="p-3 card-custom card-margin-right">
              <div className="d-flex align-items-center mb-3 background-color: white">
                <Image className="image-user" src={imageUrlleft} alt="User 1" />{" "}
                {/*Todo:동적*/}
                <div className="background-color: white">
                  <Card.Title className="card-title-large">
                    {user1Name} {/*Todo:동적*/}
                  </Card.Title>
                </div>
              </div>
              <Card.Text className="card-text-large ">
                전적: {user1Career} {/*Todo:동적*/}
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
            className="d-flex align-items-center justify-content-center vs-section"
          >
            VS
          </Col>

          <Col xs={5} className="d-flex justify-content-end">
            <Card className="p-3 card-custom card-margin-left">
              <div className="d-flex align-items-center mb-3 background-color: white">
                <Image
                  className="image-user"
                  src={imageUrlright}
                  alt="User 2"
                />{" "}
                {/*Todo:동적*/}
                <div className="background-color: white">
                  <Card.Title className="card-title-large">
                    {user2Name} {/*Todo:동적*/}
                  </Card.Title>
                </div>
              </div>
              <Card.Text className="card-text-large">
                전적: {user2Career} {/*Todo:동적*/}
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
              {" "}
              {/* back 누르면 -> 메인으로 */}
              <Button className="backBtn">Back</Button>
            </Link>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button className="readyBtn" onClick={handleReady}>
              Ready {/* Ready에 대한 상태관리 */}
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
