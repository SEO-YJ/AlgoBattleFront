import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function GamePage() {
  const [cards, setCards] = useState([]);
  const [condition, setCondition] = useState(false);
  const { state } = useLocation();
  const probNum = state?.probNum || 1000;
  const randomProblem = state?.randomProblem || "A+B";
  const qTier = state?.qTier || 1; // 오류 방지용 기본값
  const user1Name = state?.user1Name;
  const user2Name = state?.user2Name;
  //TODO 결과창으로 다시한번 navigate 써서 넘겨줘야함(한번더 후술)

  // TODO? redux로 하려다가 오버엔지니어링같아서 세션스토리지썼음
  const [time, setTime] = useState(() => {
    const savedTime = sessionStorage.getItem("timer");
    return savedTime ? Number(savedTime) : 60 * 60;
  });

  const navigate = useNavigate();

  const getBackgroundColor = (condition) => {
    return condition ? "#99ccff" : "hsl(336, 100%, 80%)";
  };

  const addCard = (e) => {
    const position = state?.position;
    console.log(position);
    e.preventDefault();
    const newCard = {
      userid: position == 1 ? `${user1Name}` : `${user2Name}`, // 형태 다른데 값만 같으면 돼서 일부러 === 말고 == 씀. 오류의 여지가 있을지도?
      //TODO user1name를 동적으로 받아와서 구현해야함.
      condition: condition,
      solved: condition
        ? `${probNum}번 문제 맞았음`
        : `${probNum}번 문제 틀렸음`,
    };

    setCondition((prevCondition) => !prevCondition); // TODO 이게 채점 알고리즘이 되지 않을까?

    const maxCards = 4; //최대 4개까지 보이게

    setCards((prevCards) => {
      let updatedCards = [...prevCards];

      if (updatedCards.length >= maxCards) {
        updatedCards = updatedCards.slice(1);
      }

      updatedCards.push(newCard);
      return updatedCards;
    });
  };

  useEffect(() => {
    const lastCard = cards[cards.length - 1];
    if (lastCard && lastCard.condition) {
      setTimeout(() => {
        alert("문제를 풀어 게임이 끝났습니다");
        sessionStorage.removeItem("timer"); // TODO? 문제 여러개 할거면 알고리즘자체를 다시짜야할거같은데 아니라고했으니..
        navigate("/room/result"); //TODO 여기서 winner, user1name, user2name 넘겨줘야함
      }, 300);
    }
  }, [cards]);

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const rotationIntervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 50);

    const timerID = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          alert("시간이 지나 게임이 끝났습니다");
          clearInterval(timerID);
          sessionStorage.removeItem("timer"); //시간이 끝나도 삭제
          navigate("/"); //바로 로비로 이동(기획과 다르면 수정하겠음)
        } else {
          const nextTime = prevTime - 1;
          sessionStorage.setItem("timer", nextTime);
          return nextTime;
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
                    src={`https://d2gd6pc034wcta.cloudfront.net/tier/${qTier}.svg`}
                    alt="Icon"
                    className="icon-image"
                  />
                  {randomProblem}
                </div>
                <div className="task-buttons">
                  <button
                    className="task-button default"
                    onClick={(e) => addCard(e)} // TODO 채점 알고리즘으로 연동되게해야함. 채점 알고리즘에 addCard도 합쳐줘야함
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
