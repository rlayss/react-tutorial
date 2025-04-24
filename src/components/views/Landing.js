import "./Landing.css";

function Landing({ setViewName }) {
  function clickHandle(evt) {
    setViewName("TypingTest");
  }

  return (
    <div class="app-container">
      <header class="app-header">
        <h1 class="app-title">타자 속도 측정기</h1>
        <p class="app-subtitle">
          VS앱 스타일로 당신의 타자 실력을 테스트하세요!
        </p>
      </header>

      <main class="main-content">
        <div class="typing-preview-box">
          <p class="typing-preview-text">오늘도 코딩으로 세상을 바꿔보자!</p>
        </div>

        <textarea
          class="typing-input"
          placeholder="여기에 타이핑하세요..."
          rows="4"
        ></textarea>

        <div class="button-group">
          <button class="start-button" onClick={clickHandle}>
            시작
          </button>
          <button class="reset-button">초기화</button>
        </div>
      </main>

      <footer class="app-footer">
        <p class="footer-text">© 2025 타자속도앱 | 만든이: 너의 닉네임</p>
      </footer>
    </div>
  );
}

export default Landing;
