import { BrowserRouter, Routes, Route } from "react-router-dom";

import StartQuiz from "./pages/StartQuiz";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result"; // if created

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartQuiz />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
