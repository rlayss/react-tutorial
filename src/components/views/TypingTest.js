import { useState } from "react";
import "./TypingTest.css";
function TypingTest({ setViewName, setTypingScore }) {
  const [targetText, setTargetText] = useState("Download the React DevTools.");
  const [elapsed, setElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [accuracy, setAccuracy] = useState(100);

  function giveupButtonHandle(evt) {
    setViewName("Landing");
  }

  function keyDownHandle(evt) {
    if (!started) {
      let id = setInterval(function () {
        setElapsed(function (nowElapsed) {
          return nowElapsed + 1;
        });
      }, 100);
      setTimerId(id);
      setStarted(true);
      return;
    }
    if (evt.key === "Backspace") {
      evt.preventDefault();
      evt.target.value = "";
      setAccuracy(100);
      return;
    }
    if (evt.ctrlKey && evt.key === "v") {
      evt.preventDefault();
      return;
    }

    if (evt.key === "Enter") {
      evt.preventDefault();
      clearTimeout(timerId);
      setStarted(false);
      evt.target.disabled = true;
      return;
      // setViewName("TypingResult");
    }
  }

  function inputHandle(evt) {
    // 맞춰야 되는 정답문구는 targetText, 사용자가 입력한 문구는 evt.target.value
    // 이거 두개를 비교해서 유사도 체크
    const userText = evt.target.value;
    if (!userText) {
      setAccuracy(100);
      return;
    }

    let correct = 0;
    let wrong = 0;
    for (let i = 0; i < userText.length; i++) {
      if (userText[i] === targetText[i]) {
        correct++;
      } else {
        wrong++;
      }
    }
    setAccuracy((correct / (correct + wrong)) * 100);
  }

  // 제출하기 버튼 클릭 이벤트 처리용
  function registerClickHandle(evt) {
    fetch("http://192.168.10.173:8080/api/typingScore/create", {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "accuracy=" + accuracy + "&elapsed=" + elapsed / 10,
    })
      .then(function (response) {
        console.log(response.status);
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        setTypingScore(json);
        setViewName("TypingResult");
      });
  }

  function contextMenuHandle(evt) {
    evt.preventDefault();
  }

  return (
    <div className="typing-test">
      <h2 className="typing-heading">타이핑 테스트</h2>

      <div className="typing-paragraph">
        <p className="target-text">{targetText}</p>
      </div>
      <div>
        백스페이스를 누르면 전체 삭제되니 유의하세요. 타이핑을 완료하면 Enter를
        쳐주셔야 결과가 산출됩니다.
      </div>
      <textarea
        className="typing-input"
        placeholder="위 문장을 정확히 입력해보세요..."
        onKeyDown={keyDownHandle}
        onContextMenu={contextMenuHandle}
        onInput={inputHandle}
      ></textarea>

      <div className="typing-stats">
        <span className="time">
          ⏱️ 시간:{" "}
          <span className="time-value">{(elapsed / 10).toFixed(1)} sec </span>
        </span>
        <span className="accuracy">
          🎯 정확도:
          <span className="accuracy-value">{accuracy.toFixed(2)}%</span>
        </span>
      </div>
      <div>
        {!started && elapsed === 0 && (
          <>
            <button className="typing-restart-btn">돌아가기</button>
          </>
        )}
        {started && (
          <>
            <button className="typing-restart-btn">포기하기</button>
          </>
        )}
        {!started && elapsed !== 0 && (
          <>
            <button className="typing-restart-btn">다시하기</button>
            <button
              className="typing-restart-btn"
              onClick={registerClickHandle}
            >
              제출하기
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TypingTest;
