import { useState } from "react";
import Landing from "./components/views/Landing";
import TypingTest from "./components/views/TypingTest";
import TypingResult from "./components/views/TypingResult";

function App() {
  const [viewName, setViewName] = useState("Landing");
  const [typingScore, setTypingScore] = useState(null);
  return (
    <>
      {viewName === "Landing" && <Landing setViewName={setViewName} />}
      {viewName === "TypingTest" && (
        <TypingTest setViewName={setViewName} setTypingScore={setTypingScore} />
      )}
      {viewName === "TypingResult" && (
        <TypingResult setViewName={setViewName} typingScore={typingScore} />
      )}
    </>
  );
}

export default App;
