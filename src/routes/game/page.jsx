// GamePage.js

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./game.css";

export default function GamePage() {
  const [cards, setCards] = useState([]);
  const [condition, setCondition] = useState(true);

  const addCard = () => {
    const newCard = {
      userid: "user 3",
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-8 game-container">
          <div className="timer-container">
            <span className="timer-icon">⏰</span>
            <span className="timer-time">01:00:00</span>{" "}
            {/* Todo: 타이머가 실시간으로 작동하도록. */}
          </div>
          <div className="task-details">
            <div className="task-card">
              <div className="task-number">
                {/* Todo: 이미지에서, 문제의 티어도 동적으로 받아오도록. */}
                <img
                  src="https://d2gd6pc034wcta.cloudfront.net/tier/22.svg"
                  alt="Icon"
                  className="icon-image"
                />
                문제 제목 {/* 제목 길이에 따라 동적으로 너비가 늘어남 */}
              </div>
              <div className="task-buttons">
                <button className="task-button category">Category</button>
                <button className="task-button default">Default</button>
              </div>
            </div>
          </div>
        </div>

        {/* 동적으로 생성되는 카드들의 모음*/}
        <div className="col-lg-4">
          {cards.map((card, index) => (
            <div key={index} className="card mb-3">
              {/* 맞았으면 True, 틀렸으면 False가 반환되겠죠? */}
              <div
                className="card-body"
                style={{
                  backgroundColor: card.condition
                    ? "#99ccff"
                    : "hsl(336, 100%, 80%)",
                }}
              >
                {/* Todo: UserId에 따라 티어 동적으로 받아오도록. */}
                <img
                  src={`https://d2gd6pc034wcta.cloudfront.net/tier/22.svg`}
                  alt={`err`}
                  className="user-image"
                  style={{
                    backgroundColor: card.condition
                      ? "#99ccff"
                      : "hsl(336, 100%, 80%)",
                  }}
                />
                <h5
                  className="card-title"
                  style={{
                    backgroundColor: card.condition
                      ? "#99ccff"
                      : "hsl(336, 100%, 80%)",
                  }}
                >
                  {card.userid}
                </h5>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor: card.condition
                      ? "#99ccff"
                      : "hsl(336, 100%, 80%)",
                  }}
                >
                  <div
                    className="card-text h3"
                    style={{
                      backgroundColor: card.condition
                        ? "#99ccff"
                        : "hsl(336, 100%, 80%)",
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
