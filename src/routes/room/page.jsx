import React from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function RoomPage() {
  // 임의의 이미지 URL을 넣어주세요.
  const imageUrl = "https://d2gd6pc034wcta.cloudfront.net/tier/11.svg";
  const imageUrlleft = "https://d2gd6pc034wcta.cloudfront.net/tier/13.svg";
  const imageUrlright = "https://d2gd6pc034wcta.cloudfront.net/tier/14.svg";

  return (
    <Container className="text-center" style={{ marginTop: "20px" }}>
      <Row className="flex-column align-items-center">
        <Col className="mb-2">
          <Image
            src={imageUrl}
            alt="Custom Image"
            style={{ width: "64px", height: "64px" }}
          />
          <div
            className="font-weight-bold"
            style={{ fontSize: "24px", marginTop: "10px" }}
          >
            방 이름
          </div>
        </Col>

        {/* 버튼 */}
        <Button
          className="mt-2"
          variant="primary"
          style={{ padding: "4px 8px", fontSize: "24px", width: "120px" }}
        >
          버튼
        </Button>

        {/* 추가된 부분 */}
        <Row className="mt-4 w-100">
          {/* 좌측 정렬된 사용자 정보 */}
          <Col xs={5}>
            <Card
              className="p-3 position-relative"
              style={{
                border: "none",
                background: "white",
                width: "80%", // Adjusted width
                height: "200px", // Adjusted height
                marginLeft: "auto", // Align to the right
              }}
            >
              <div className="d-flex align-items-center">
                <Image
                  src={imageUrlleft}
                  alt="User 1"
                  style={{
                    width: "48px", // Larger width
                    height: "48px", // Larger height
                    marginRight: "10px",
                  }}
                />
                <div>
                  <Card.Title className="mb-0">User 1</Card.Title>
                  <Card.Text style={{ fontSize: "12px" }}>
                    Info about User 1
                  </Card.Text>
                </div>
              </div>
              <Button
                variant="secondary"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  padding: "2px 4px",
                  fontSize: "20px",
                }}
              >
                Ready
              </Button>
            </Card>
          </Col>

          {/* 가운데 정렬된 'VS' 텍스트 */}
          <Col
            xs={2}
            className="text-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontSize: "48px",
            }}
          >
            VS
          </Col>

          {/* 우측 정렬된 사용자 정보 */}
          <Col xs={5}>
            <Card
              className="p-3 position-relative"
              style={{
                border: "none",
                background: "white",
                width: "80%", // Adjusted width
                height: "200px", // Adjusted height
                marginRight: "auto", // Align to the left
              }}
            >
              <div className="d-flex align-items-center">
                <Image
                  src={imageUrlright}
                  alt="User 2"
                  style={{
                    width: "48px", // Larger width
                    height: "48px", // Larger height
                    marginRight: "10px",
                  }}
                />
                <div>
                  <Card.Title className="mb-0">User 2</Card.Title>
                  <Card.Text style={{ fontSize: "12px" }}>
                    Info about User 2
                  </Card.Text>
                </div>
              </div>
              <Button
                variant="secondary"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "10px",
                  padding: "2px 4px",
                  fontSize: "20px",
                }}
              >
                Ready
              </Button>
            </Card>
          </Col>
        </Row>

        {/* 추가된 부분: 여백과 좌측 및 우측 버튼 */}
        <Row className="mt-4">
          {/* 여백 */}

          {/* 좌측 버튼 */}
          <Col xs={3}>
            <Button
              variant="danger"
              style={{ padding: "4px 8px", fontSize: "24px" }}
            >
              back
            </Button>
          </Col>
          <Col xs={3}></Col>
          <Col xs={3}></Col>
          {/* 우측 버튼 */}
          <Col xs={3} className="text-right">
            <Button
              variant="success"
              style={{ padding: "4px 8px", fontSize: "24px" }}
            >
              ready
            </Button>
          </Col>

          {/* 여백 */}
        </Row>
      </Row>
    </Container>
  );
}
