import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./room.css";
import axios from "axios";
import socket from "~/lib/sockets/socket";
import { fetchUser } from "../store/reducers/user";

export default function RoomPage() {
  //const roomId: main라우터대로 주소를 바꾸면 이것도 받아오는게 맞는거같음
  // [1]: 한번만 받아줘도 되는 값 / [2]: 실시간으로 갱신해줘야하는
  const { roomId } = useParams();
  const { handle, tier } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const [roomName, setRoomName] = useState("방 이름입니다");
  const [algoName, setAlgoName] = useState("전체");
  const [roomTier, setRoomTier] = useState("0");
  const [user1Name, setUser1Name] = useState("0");
  const [user1win, setUser1win] = useState("0");
  const [user1lose, setUser1lose] = useState("0");
  const [user1Tier, setUser1Tier] = useState("0");
  const imageUrl = `https://d2gd6pc034wcta.cloudfront.net/tier/${roomTier}.svg`; // [1]
  const imageUrlleft = `https://d2gd6pc034wcta.cloudfront.net/tier/${user1Tier}.svg`; // [1]

  const [user2Tier, setUser2Tier] = useState(0); // [2]
  const imageUrlright = `https://d2gd6pc034wcta.cloudfront.net/tier/${user2Tier}.svg`; // [2]
  const [user2Name, setUser2Name] = useState("미정"); // [2] TODO: 받는 방식 협의
  const [user2win, setUser2win] = useState("0"); // [2]
  const [user2lose, setUser2lose] = useState("0"); // [2]

  const navigateTo = useNavigate();
  const [player1Ready, setPlayer1Ready] = useState(false);
  const [player2Ready, setPlayer2Ready] = useState(false); //commit할때 false로 수정. 안되어있으면 바꿔주세요 ㅎㅎ!

  useEffect(() => {
    socket.emit("getRoom", { roomId: roomId });

    socket.on("getRoom", (data) => {
      console.log("data : ", data);
      setRoomName(data.name);
      setAlgoName(data.algorithm);
      setRoomTier(data.level);

      setUser1Name(data.player1.handle);

      if (data.player2) {
        setUser2Name(data.player2.handle);
      }
    });
  }, [roomId]);

  useEffect(()=>{
    const action = fetchUser({userName: user1Name});
    dispatch(action).then(data =>{
      const user = data.payload;
      setUser1Tier(user.tier);
      setUser1win(user.winCount);
      setUser1lose(user.loseCount);
    })
  },[user1Name, dispatch])

  useEffect(()=>{
    const action = fetchUser({userName: user2Name});
    dispatch(action).then(data => {
      const user = data.payload;
      setUser2Tier(user.tier);
      setUser2win(user.winCount);
      setUser2lose(user.loseCount);
    })
  }, [user2Name, dispatch])

  const handleReady = () => {
    if (handle === user1Name) {
      setPlayer1Ready(!player1Ready);
    } else if (handle === user2Name) {
      setPlayer2Ready(!player2Ready);
    }
  };

  const handleStart = async () => {
    if (player1Ready && player2Ready) {
      try {
        const queryString =
          algoName === "전체" ? `` : `?aliase=${encodeURIComponent(algoName)}`;
        const response = await axios.get(
          `http://localhost:3000/api/problem/${roomTier}${queryString}`
        );
        const randomProblem = response.data.ploblem;
        const probNum = response.data.ploblemId;
        const qTier = response.data.level;

        navigateTo(`/room/${roomId}/game`, {
          state: {
            randomProblem,
            probNum,
            qTier,
            user1Name,
            user2Name,
            user1Tier,
            user2Tier,
          },
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
            {handle === user1Name && (
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
              {/* TODO 이거 뒤로갈때 position에 따라 user1이면 방을 폭파,
              user2이면 user2와 관련된 모든 정보들을 null로 만들어줘야 한다. */}
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
