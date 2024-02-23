import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";

export default function GamePage() {
  const [cards, setCards] = useState([]);
  const [condition, setCondition] = useState(true);
  const [probNum, setProbNum] = useState(1000); //TODO: 문제번호를 받아와서 세팅할수 있게 해야할듯?
  const [time, setTime] = useState(60 * 60); // 초 단위로 1시간

  const handleCheckButtonClick = (e) => {
    e.preventDefault();

    const checkUrl = "https://www.naver.com";

    window.open(checkUrl, "_blank");
  };

  const getBackgroundColor = (condition) => {
    return condition ? "#99ccff" : "hsl(336, 100%, 80%)";
  };

  const addCard = () => {
    const newCard = {
      userid: "user 3",
      solved: condition
        ? `${probNum}번 문제 맞았음`
        : `${probNum}번 문제 틀렸음`,
      condition: condition,
    };

    setCondition((prevCondition) => !prevCondition);

    const maxCards = 4;

    setCards((prevCards) => {
      let updatedCards = [...prevCards];

      if (updatedCards.length >= maxCards) {
        updatedCards = updatedCards.slice(1);
      }

      updatedCards.push(newCard);

      return updatedCards;
    });
  };

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
            src="https://media.forgecdn.net/avatars/284/604/637297967395646856.jpeg"
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
                    src="https://d2gd6pc034wcta.cloudfront.net/tier/22.svg"
                    alt="Icon"
                    className="icon-image"
                  />
                  문제 제목
                </div>
                <div className="task-buttons">
                  <button
                    className="task-button default"
                    onClick={(e) => handleCheckButtonClick(e)}
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
                  src={`https://d2gd6pc034wcta.cloudfront.net/tier/22.svg`}
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

          <button onClick={addCard} className="btn btn-primary">
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}
