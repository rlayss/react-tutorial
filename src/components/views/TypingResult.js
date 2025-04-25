import { useEffect, useState } from "react";
import "./TypingResult.css";
function TypingResult({ typingScore, setViewName }) {
  const [scores, setScores] = useState({ top: [], middle: [], bottom: [] });

  useEffect(function () {
    fetch(
      "http://192.168.10.173:8080/api/typingScore/ranking?scoreId=" +
        typingScore.id,
      {
        method: "get",
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        setScores(json);
      });
  }, []);

  return (
    <div class="result-page">
      <h2 class="result-title">🏁 타이핑 결과</h2>
      <div class="user-ranking-highlight">
        <p class="user-stats">
          ⏱ {typingScore.elapsed}초 &nbsp;|&nbsp; 🎯 정확도{" "}
          {typingScore.accuracy.toFixed(2)}%
        </p>
      </div>
      <h3 class="ranking-title">📊 전체 순위</h3>
      <ol class="ranking-list">
        {scores.top &&
          scores.top.map((one) => {
            return (
              <li
                key={one.score.id}
                className={one.mine ? "highlight" : "default"}
              >
                <span className="rank">
                  {one.rank}위 {one.mine && <span>(나)</span>}
                </span>{" "}
                - 정확도 🎯 {one.score.accuracy.toFixed(2)}%, ⏱{" "}
                {one.score.elapsed.toFixed(2)}초
              </li>
            );
          })}

        {scores.middle &&
          scores.middle.map((one) => {
            return (
              <li
                key={one.score.id}
                className={one.mine ? "highlight" : "default"}
              >
                <span className="rank">
                  {one.rank}위 {one.mine && <span>(나)</span>}
                </span>{" "}
                - 정확도 🎯 {one.score.accuracy.toFixed(2)}%, ⏱{" "}
                {one.score.elapsed.toFixed(2)}초
              </li>
            );
          })}

        {scores.bottom &&
          scores.bottom.map((one) => {
            return (
              <li
                key={one.score.id}
                className={one.mine ? "highlight" : "default"}
              >
                <span className="rank">
                  {one.rank}위 {one.mine && <span>(나)</span>}
                </span>{" "}
                - 정확도 🎯 {one.score.accuracy.toFixed(2)}%, ⏱{" "}
                {one.score.elapsed.toFixed(2)}초
              </li>
            );
          })}
      </ol>

      <button class="retry-btn">다시하기</button>
    </div>
  );
}

export default TypingResult;
