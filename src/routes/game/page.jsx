// GamePage.js

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";

export default function GamePage() {
  const [cards, setCards] = useState([]);
  const [condition, setCondition] = useState(true);
  const [probNum, setProbNum] = useState(1000);
  const handleCheckButtonClick = () => {
    // 채점하기 버튼 클릭 시 열릴 URL 설정
    const checkUrl = "https://www.naver.com";

    // 새 창에서 URL 열기
    window.open(checkUrl, "_blank");
  };

  /* Todo: 백엔드랑 같이 setProbNum 작성하기 */

  const getBackgroundColor = (condition) => {
    return condition ? "#99ccff" : "hsl(336, 100%, 80%)";
  };

  const addCard = () => {
    const newCard = {
      userid: "user 3", // Todo: 유저 아이디도 동적으로 받아올 예정.
      solved: "번 문제 풀었음", // Todo: 문제번호를 동적으로 받아올 예정.
      condition: condition, // Todo: 맞았는지 틀렸는지로 받아올 예정.
    };

    setCondition((prevCondition) => !prevCondition); /* 임시로 토글로 설정해둠. 
    Todo: condition: 문제를 맞았는가? 여부로 받아와서 setCondition*/

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
    const intervalId = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 game-container">
          <img
            src="https://media.forgecdn.net/avatars/284/604/637297967395646856.jpeg" // 임시 이미지입니다..
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
            <span className="timer-time">140:00</span>{" "}
            {/* Todo: 타이머가 실시간으로 작동하도록. */}
          </div>
          <div className="task-details">
            <a
              href={`https://www.acmicpc.net/problem/${probNum}`}
              target="_blank"
              rel="noopener noreferrer"
              className="noDecoration" //
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
                    onClick={handleCheckButtonClick}
                  >
                    채점하기
                  </button>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 동적으로 생성되는 카드들의 모음*/}
        <div className="col-lg-4">
          {cards.map((card, index) => (
            <div key={index} className="card mb-3">
              {/* 맞았으면 True, 틀렸으면 False가 반환되겠죠? */}
              <div
                className="card-body"
                style={{ backgroundColor: getBackgroundColor(card.condition) }}
              >
                {/* Todo: UserId에 따라 티어 동적으로 받아오도록. */}
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
            {/* 임시로 설정함. 채점 결과에 따라 카드가 반환되면 제거 예정 */}
          </button>
        </div>
      </div>
    </div>
  );
}
