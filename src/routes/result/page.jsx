import React, { useState } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./result.css";

export default function ResultPage() {
  const { state } = useLocation();
  const user1Tier = state?.user1Tier;
  const user2Tier = state?.user2Tier;
  const imageUrlleft = `https://d2gd6pc034wcta.cloudfront.net/tier/${user1Tier}.svg`;
  const imageUrlright = `https://d2gd6pc034wcta.cloudfront.net/tier/${user2Tier}.svg`;
  const user1Name = state?.user1Name;
  const user2Name = state?.user2Name;
  const user1win = "12";
  const user1lose = "4";
  const user2win = "15";
  const user2lose = "1"; // TODO navigate로 받아와서 넘길지 결과처리할때 서버에서 통신해서 할지 고민중임
  const winner = state?.winner;
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
                    {winner == 1 ? `${user1Name}` : `${user2Name}`}
                    {/* TODO winner=1이면 user1Name winner=2면 user2Name*/}
                  </Card.Title>
                </div>
              </div>
              <Card.Text
                className="card-text-large"
                style={{ fontSize: "32px", marginBottom: "20px" }}
              >
                승리!
              </Card.Text>
              <div style={{ marginBottom: "20px" }}>
                전적: {winner == 1 ? `${user1win}` : `${user2win}`} 승{" "}
                {winner == 1 ? `${user1lose}` : `${user2lose}`} 패
              </div>
              {/* TODO winner=1이면 user1Career winner=2면 user2Career*/}
            </Card>
          </Col>

          <Col
            xs={2}
            className="d-flex flex-column align-items-center justify-content-center vs-section"
          >
            VS
          </Col>
          {/* TODO 승자칸과 동일*/}
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
                    {winner == 1 ? `${user2Name}` : `${user1Name}`}
                  </Card.Title>
                </div>
              </div>
              <Card.Text
                className="card-text-large"
                style={{ fontSize: "32px", marginBottom: "20px" }}
              >
                패배..
              </Card.Text>
              <div style={{ marginBottom: "20px" }}>
                전적: {winner == 1 ? `${user2win}` : `${user1win}`} 승{" "}
                {winner == 1 ? `${user2lose}` : `${user1lose}`} 패
              </div>
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
