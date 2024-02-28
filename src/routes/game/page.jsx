import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import socket from "~/lib/sockets/socket";
import { Col, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

export default function GamePage() {
  const [cards, setCards] = useState([]);
  const [condition, setCondition] = useState(false);
  const { state } = useLocation();
  const probNum = state?.probNum || 1000;
  const randomProblem = state?.randomProblem || "A+B";
  const qTier = state?.qTier || 1; // 오류 방지용 기본값
  const user1Name = state?.user1Name;
  const user2Name = state?.user2Name;
  const user1Tier = state?.user1Tier;
  const user2Tier = state?.user2Tier;
  const user1win = parseInt(state?.user1win, 10);
  const user1lose = parseInt(state?.user1lose, 10);
  const user2win = parseInt(state?.user2win, 10);
  const user2lose = parseInt(state?.user2lose, 10);
  const { handle } = useSelector((state) => state.user.user);
  const { roomId } = useParams();
  const [startTime, setStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem("initialStartTime");
    return savedStartTime ? parseInt(savedStartTime, 10) : Date.now();
  });
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("timer");
    return savedTime ? Number(savedTime) : 60 * 60;
  });

  const navigate = useNavigate();

  const getBackgroundColor = (condition) => {
    return condition ? "#99ccff" : "hsl(336, 100%, 80%)";
  };

  const addCard = async (e) => {
    e.preventDefault();
    const encodedUser1Name = encodeURIComponent(user1Name);
    const encodedUser2Name = encodeURIComponent(user2Name);
    const userName = handle === user1Name ? encodedUser1Name : encodedUser2Name;

    try {
      const response = await fetch(
        `/api/users/${userName}/solvedStatus`
      );

      if (!response.ok) {
        throw new Error(`채점에 오류가 발생했어요`);
      }

      const data = await response.json();
      const result = data.result;

      setCondition((prevCondition) => result === "맞았습니다");

      const newCard = {
        userid: userName,
        condition: result === "맞았습니다",
        solved:
          result === "맞았습니다"
            ? `${probNum}번 문제 맞았음`
            : `${probNum}번 문제 틀렸음`,
        tierinfo: handle === user1Name ? `${user1Tier}` : `${user2Tier}`,
      };

      const maxCards = 4;

      setCards((prevCards) => {
        let updatedCards = [...prevCards];

        if (updatedCards.length >= maxCards) {
          updatedCards = updatedCards.slice(1);
        }

        updatedCards.push(newCard);

        socket.emit("updatedCard", { updatedCards, roomId });

        return updatedCards;
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  socket.on("updatedCard", (data) => {
    if (data && Array.isArray(data)) {
      setCards(data);
    }
  });

  useEffect(() => {
    const lastCard = cards[cards.length - 1];
    if (lastCard && lastCard.condition) {
      setTimeout(async () => {
        const winner = lastCard.userid === user1Name ? 1 : 2;
        try {
          const response = await fetch(
            `/api/users/${lastCard.userid}`,
            {
              method: "POST",
            }
          );

          if (!response.ok) {
            throw new Error(`사용자 정보 업데이트에 오류가 발생했어요`);
          }

          const updatedUserData = await response.json();

          socket.emit("finishGame", { winner, roomId });
        } catch (error) {
          console.error("Error:", error.message);
        }
      }, 300);
    }
  }, [cards]);

  useEffect(() => {
    const finishGameHandler = (winner) => {
      Swal.fire({
        icon:"error",
        title: "문제를 푼 플레이어가 있어 게임이 끝났습니다.",
      })
      localStorage.removeItem("timer");
      localStorage.removeItem("initialStartTime");
      const newuser1win = winner == 1 ? user1win + 1 : user1win;
      const newuser1lose = winner == 1 ? user1lose : user1lose + 1;
      const newuser2win = winner == 2 ? user2win + 1 : user2win;
      const newuser2lose = winner == 2 ? user2lose : user2lose + 1;

      navigate(`/room/${roomId}/result`, {
        state: {
          user1Name,
          user2Name,
          user1Tier,
          user2Tier,
          winner,
          newuser1win,
          newuser1lose,
          newuser2win,
          newuser2lose,
        },
      });
    };

    socket.on("finishGame", finishGameHandler);

    return () => {
      socket.off("finishGame", finishGameHandler);
    };
  }, [navigate]);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotationIntervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 50);

    const timerID = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = 3600 - elapsedTime;

      if (remainingTime <= 0) {
        Swal.fire({
          icon:"error",
          title: "시간이 지나 게임이 끝났습니다",
        })
        clearInterval(timerID);
        localStorage.removeItem("timer");
        localStorage.removeItem("initialStartTime");
        navigate("/");
      } else {
        localStorage.setItem("timer", remainingTime);
        localStorage.setItem("initialStartTime", startTime.toString());
        setTime(remainingTime);
      }
    }, 1000);

    return () => {
      clearInterval(rotationIntervalId);
      clearInterval(timerID);
    };
  }, [startTime, navigate]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleBack = async () => {
    const exituser = handle === user1Name ? user1Name : user2Name;
    const result = exituser === user1Name ? 2 : 1;
    await axios.put("/api/users/updateResult", {
      user1: user1Name,
      user2: user2Name,
      result: result.toString(),
    });
    localStorage.removeItem("timer");
    localStorage.removeItem("initialStartTime");

    socket.emit("exitGame", roomId);
    navigate("/");
  };

  useEffect(() => {
    const exitGameHandler = (data) => {
      const roomId = data;
      const exitAlert = () => {
        Swal.fire({
          icon:"error",
          title: "상대방이 나갔습니다",
          text:"승패는 반영되니 안심하세요",
        })
      };

      setTimeout(() => {
        exitAlert();
      }, 500);
      localStorage.removeItem("timer");
      localStorage.removeItem("initialStartTime");
      socket.emit("leaveGame", roomId);
      navigate("/");
    };

    socket.on("exitGame", exitGameHandler);

    return () => {
      socket.off("exitGame", exitGameHandler);
    };
  }, [navigate]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 game-container">
          <img
            src="https://raw.githubusercontent.com/jkl0124/AlgoBattleFront/main/src/assets/imgs/sample_logo_transparent.png"
            alt="Rotating"
            className="rotating-image"
            style={{
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
            }}
          />
          <p>문제의 아무 영역이나 누르면 문제풀기 창으로 이동해요!</p>
          <p>채점하기를 누르면 채점이 가능합니다</p>

          <div className="timer-container">
            <span className="timer-icon">⏰</span>
            <span className="timer-time">{formatTime(time)}</span>
          </div>

          <div className="task-details">
            <a
              href={`https://www.acmicpc.net/problem/${probNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className="noDecoration"
            >
              <div className="task-card">
                <div className="task-number">
                  <img
                    src={`https://d2gd6pc034wcta.cloudfront.net/tier/${qTier}.svg`}
                    alt="Icon"
                    className="icon-image"
                  />
                  {randomProblem}
                </div>
                <div className="task-buttons">
                  <button
                    className="task-button default"
                    onClick={(e) => {
                      e.preventDefault();
                      addCard(e);
                    }}
                  >
                    채점하기
                  </button>
                </div>
              </div>
            </a>
          </div>
          <Col
            className="d-flex justify-content-start"
            style={{
              position: "absolute",
              bottom: "0",
              left: "0",
              margin: "10px",
            }}
          >
            <Button className="backBtn" onClick={handleBack}>
              나가기
            </Button>
          </Col>
        </div>

        <div className="col-lg-4">
          {cards.map((card, index) => (
            <div key={index} className="card mb-3">
              <div
                className="card-body"
                style={{ backgroundColor: getBackgroundColor(card.condition) }}
              >
                <img
                  src={`https://d2gd6pc034wcta.cloudfront.net/tier/${card.tierinfo}.svg`}
                  alt={`err`}
                  className="user-image"
                  style={{
                    backgroundColor: getBackgroundColor(card.condition),
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    backgroundColor: getBackgroundColor(card.condition),
                  }}
                >
                  {card.userid}
                </h5>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: getBackgroundColor(card.condition),
                  }}
                >
                  <div
                    className="card-text h3"
                    style={{
                      backgroundColor: getBackgroundColor(card.condition),
                    }}
                  >
                    {card.solved}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
