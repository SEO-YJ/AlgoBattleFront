import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./result.css";

export default function ResultPage() {
  const user1Tier = "28";
  const user2Tier = "26"; // 동적으로 받아서, 아래선 그냥 정적으로 뿌릴 예정
  const imageUrlleft = `https://d2gd6pc034wcta.cloudfront.net/tier/${user1Tier}.svg`;
  const imageUrlright = `https://d2gd6pc034wcta.cloudfront.net/tier/${user2Tier}.svg`;
  const user1Name = "User 1";
  const user2Name = "User 2"; //TODO username 1과 2를 받아와야함
  const user1Career = "13승 3패"; //TODO: 백엔드에서 게임 결과 후 승패를 추가해주면 다시 받아오기..?
  const user2Career = "15승 2패"; //TODO: 백엔드에서 게임 결과 후 승패를 추가해주면 다시 받아오기..?
  const winner = "1"; // 누가 이겼는지 받아와줘서 승/패를 띄우려고 함.
  const navigate = useNavigate();

  return (
    <Container className="text-center container-margin-top">
      <Row className="flex-column align-items-center">
        <Col className="d-flex justify-content-center">
          <div className="font-bold-large mt-2">Battle Result</div>
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
              <Card.Text
                className="card-text-large"
                style={{ fontSize: "32px", marginBottom: "20px" }}
              >
                승리!
              </Card.Text>
              <div style={{ marginBottom: "20px" }}>전적: {user1Career}</div>
            </Card>
          </Col>

          <Col
            xs={2}
            className="d-flex flex-column align-items-center justify-content-center vs-section"
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
                />
                <div className="background-color: white">
                  <Card.Title className="card-title-large">
                    {user1Name}
                  </Card.Title>
                </div>
              </div>
              <Card.Text
                className="card-text-large"
                style={{ fontSize: "32px", marginBottom: "20px" }}
              >
                패배..
              </Card.Text>
              <div style={{ marginBottom: "20px" }}>전적: {user2Career}</div>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4 w-100">
          <Col className="d-flex justify-content-start">
            <Button className="backBtn" onClick={() => navigate("/")}>
              로비로 가기
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button className="readyBtn" onClick={() => navigate("/room")}>
              한판 더 하기
            </Button>{" "}
            {/* TODO: 한판 더 할때, 방 들어갈때와 유사하게 사용자 데이터 갱신시켜줘야 할거같음.
            + 둘중에 한명이라도 나가기 누르면 자동으로 방이 터지고 로비로 돌아가도록 했으면 */}
          </Col>
        </Row>
      </Row>
    </Container>
  );
}
