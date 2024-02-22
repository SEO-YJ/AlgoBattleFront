import React from "react";
import "./game.css"; // 추가된 부분

export default function GamePage() {
  return (
    <div className="game-container">
      <div className="timer-container">
        <span className="timer-icon">⏰</span>
        <span className="timer-time">01:00:00</span>
      </div>
      <div className="task-details">
        <div className="task-card">
          <div className="task-number">
            <img
              src="https://d2gd6pc034wcta.cloudfront.net/tier/22.svg"
              alt="Icon"
              className="icon-image"
            />{" "}
            {/* 추가된 부분 */}
            문제 제목
          </div>
          <div className="task-buttons">
            <button className="task-button category">Category</button>
            <button className="task-button default">Default</button>
          </div>
        </div>
      </div>
    </div>
  );
}
