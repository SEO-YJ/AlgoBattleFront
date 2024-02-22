import React from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";

//Todo: 전체적인 백엔드와의 연결이 필요할거 같음

export default function RoomPage() {
  const imageUrl = "https://d2gd6pc034wcta.cloudfront.net/tier/11.svg";
  const imageUrlleft = "https://d2gd6pc034wcta.cloudfront.net/tier/13.svg";
  const imageUrlright = "https://d2gd6pc034wcta.cloudfront.net/tier/14.svg";

  return (
    <Container className="text-center container-margin-top">
      <Row className="flex-column align-items-center">
        <Col className="mb-2 d-flex justify-content-center">
          <Image src={imageUrl} alt="Custom Image" className="image-size" />
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="font-bold-large mt-2">방 이름</div>
          {/* Todo: 방 이름 받아와야함 */}
        </Col>
        <Col className="d-flex justify-content-center">
          <Button className="algoBtn" variant="primary">
            알고리즘 이름 {/* Todo: 알고리즘 명 받아와야 함 */}
          </Button>
        </Col>

        <Row className="mt-4 w-100">
          <Col xs={5} className="d-flex justify-content-start">
            {/* 유저 1의 정보를 담은 카드 */}
            <Card className="p-3 card-custom card-margin-right">
              <div className="d-flex align-items-center mb-3">
                <Image className="image-user" src={imageUrlleft} alt="User 1" />
                <div className="background-color: white">
                  <Card.Title className="card-title-large">User 1</Card.Title>
                  {/* Todo: 유저 이름 받아와야함 */}
                </div>
              </div>
              <Card.Text className="card-text-large">
                전적: 15승 3패 {/* Todo: 유저 승패 받아와야함 */}
              </Card.Text>
              <Button className="button-bottom-right" variant="secondary">
                Ready
                {/* Todo: 아래 레디가 onClick 되었을때 불이 들어오거나 나타나거나...? */}
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
            {/* 유저 1과 동일함 */}
            <Card className="p-3 card-custom card-margin-left">
              <div className="d-flex align-items-center mb-3">
                <Image
                  className="image-user"
                  src={imageUrlright}
                  alt="User 2"
                />
                <div className="background-color: white">
                  <Card.Title className="card-title-large">User 2</Card.Title>
                </div>
              </div>
              <Card.Text className="card-text-large"> 전적: 19승 2패</Card.Text>
              <Button className="button-bottom-right" variant="secondary">
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
            <Button className="readyBtn">Ready</Button>{" "}
            {/* Todo: onClick -> 레디상태 되게 해야함 */}
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
