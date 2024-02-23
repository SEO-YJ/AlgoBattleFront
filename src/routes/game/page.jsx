import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function GamePage() {
  const [cards, setCards] = useState([]);
  const [condition, setCondition] = useState(false);

  const { state } = useLocation();
  const probNum = state?.probNum || 1001;
  const randomProblem = state?.randomProblem || "질문";
  const qTier = state?.qTier || 12;

  const [time, setTime] = useState(60 * 60); // 초 단위로 1시간
  const navigate = useNavigate();

  const getBackgroundColor = (condition) => {
    return condition ? "#99ccff" : "hsl(336, 100%, 80%)";
  };

  //TODO setProbNum 작성

  const addCard = (e) => {
    e.preventDefault();
    const newCard = {
      userid: "user 3", //TODO user ID 받아와야함
      condition: condition, // TODO 정답 여부를 반환하도록 해야 함 (백엔드 영역)
      solved: condition
        ? `${probNum}번 문제 맞았음`
        : `${probNum}번 문제 틀렸음`,
    };

    setCondition((prevCondition) => !prevCondition); // 백엔드에서 정답여부 반환할수 있도록 되면 제거예정. dummy임

    const maxCards = 4;

    setCards((prevCards) => {
      let updatedCards = [...prevCards];

      if (updatedCards.length >= maxCards) {
        updatedCards = updatedCards.slice(1);
      }

      updatedCards.push(newCard);
      return updatedCards;
    }); // 4개 이상의 카드가 생성되면 이전의 카드부터 제거할 예정.
  };
  useEffect(() => {
    const lastCard = cards[cards.length - 1];
    if (lastCard && lastCard.condition) {
      setTimeout(() => {
        alert("게임이 끝났습니다");
        navigate("/room/result");
      }, 300);
    }
  }, [cards]); //TODO 이게 뜨면 백엔드에서 승패판정해줘야함. 결과창갈때 변경된 전적을 반영해야 함
  //TODO 이후 마지막 카드에서, userid를 분석해서 (누가 만든 카드인지) 승패판정 할 수 있을 듯

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotationIntervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 50);

    const timerID = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerID);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => {
      clearInterval(rotationIntervalId);
      clearInterval(timerID);
    };
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 game-container">
          <img
            src="/src/assets/imgs/sample_logo_transparent.png"
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
                    src={`https://d2gd6pc034wcta.cloudfront.net/tier/${qTier}.svg`} //TODO tier/$(qtier).svg
                    alt="Icon"
                    className="icon-image"
                  />
                  {randomProblem}
                </div>
                <div className="task-buttons">
                  <button
                    className="task-button default"
                    onClick={(e) => addCard(e)}
                  >
                    채점하기
                  </button>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="col-lg-4">
          {cards.map((card, index) => (
            <div key={index} className="card mb-3">
              <div
                className="card-body"
                style={{ backgroundColor: getBackgroundColor(card.condition) }}
              >
                <img
                  src={`https://d2gd6pc034wcta.cloudfront.net/tier/${qTier}.svg`} //TODO user 정보 받아와줘야함
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
