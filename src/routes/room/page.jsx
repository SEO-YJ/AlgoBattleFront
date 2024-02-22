import React from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css"; // room.css import

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
          <div className="font-bold-large mt-2">방 이름</div>{" "}
          {/* Todo: 방 이름 받아와야함 */}
        </Col>
        <Col className="d-flex justify-content-center">
          <Button className="mt-2 button-large button-width" variant="primary">
            버튼 {/* Todo: 알고리즘 이름 받아와야함 */}
          </Button>
        </Col>

        <Row className="mt-4 w-100">
          <Col xs={5} className="d-flex justify-content-start">
            {/* 유저 1의 정보를 담은 카드 */}
            <Card className="p-3 card-custom card-margin-right">
              <div className="d-flex align-items-center mb-3">
                <Image className="image-user" src={imageUrlleft} alt="User 1" />
                <div>
                  <Card.Title className="card-title-large">User 1</Card.Title>{" "}
                  {/* Todo: 사용자  이름 받아와야함 */}
                </div>
              </div>
              <Card.Text className="card-text-large">
                Info about User 1 {/* Todo: 사용자 승패 받아와야함 */}
              </Card.Text>
              <Button className="button-bottom-right" variant="secondary">
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
            {/* 유저 1과 동일함 */}
            <Card className="p-3 card-custom card-margin-left">
              <div className="d-flex align-items-center mb-3">
                <Image
                  className="image-user"
                  src={imageUrlright}
                  alt="User 2"
                />
                <div>
                  <Card.Title className="card-title-large">User 2</Card.Title>
                </div>
              </div>
              <Card.Text className="card-text-large">
                Info about User 2
              </Card.Text>
              <Button className="button-bottom-right" variant="secondary">
                Ready
              </Button>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col xs={3}>
            <Button className="button-large" variant="danger">
              Back
            </Button>
          </Col>
          <Col xs={3}></Col>
          <Col xs={3}></Col>
          <Col xs={3} className="text-right">
            <Button className="button-large" variant="success">
              Ready
            </Button>
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
