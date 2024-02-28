import React, { useEffect } from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./result.css";
import axios from "axios";

const ResultPage = () => {
  const handle = useSelector((state) => state.user.user.handle);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const user1Tier = state?.user1Tier;
  const user2Tier = state?.user2Tier;
  const imageUrlleft = `https://d2gd6pc034wcta.cloudfront.net/tier/${user1Tier}.svg`;
  const imageUrlright = `https://d2gd6pc034wcta.cloudfront.net/tier/${user2Tier}.svg`;
  const user1Name = state?.user1Name;
  const user2Name = state?.user2Name;
  const user1win = state?.newuser1win;
  const user1lose = state?.newuser1lose;
  const user2win = state?.newuser2win;
  const user2lose = state?.newuser2lose;
  const winner = state?.winner;

  useEffect(() => {
    const updateResultAndRedirect = async () => {
      try {
        if (handle === user1Name) {
          await axios.put("/api/users/updateResult", {
            user1: user1Name,
            user2: user2Name,
            result: winner.toString(),
          });
        }

        setTimeout(() => {
          navigate(`/room/${roomId}`);
        }, 5000);
      } catch (error) {
        console.error("Error updating result:", error);
      }
    };

    updateResultAndRedirect();
  }, [navigate, roomId, user1Name, user2Name, winner, handle]);

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
      </Row>
    </Container>
  );
};

export default ResultPage;
