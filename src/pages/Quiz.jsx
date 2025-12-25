import React, { useEffect, useState,useRef  } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { fetchQuizQuestions } from "../services/quizApi";

const Quiz = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { subject, numberOfQuestions } = state || {};

   const totalTimeRef = useRef(0);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const [score, setScore] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [loading, setLoading] = useState(true);

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!subject || !numberOfQuestions) {
      navigate("/");
      return;
    }

    const loadQuiz = async () => {
      try {
        const data = await fetchQuizQuestions({
          subject,
          count: numberOfQuestions,
        });
        setQuestions(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [subject, numberOfQuestions, navigate]);

  useEffect(() => {
  setTime(0);

  const interval = setInterval(() => {
    setTime((t) => t + 1);
    totalTimeRef.current += 1; // accumulate total time
  }, 1000);

  return () => clearInterval(interval);
}, [currentIndex]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading quiz…
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  if (!currentQuestion) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSubmit = () => {
    if (!selected) return;

    setSubmitted(true);

    if (selected === currentQuestion.correctAnswer) {
      setIsCorrect(true);
      setScore((s) => s + 1);
    } else {
      setIsCorrect(false);
      setIncorrectAttempts((p) => p + 1);
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setSubmitted(false);
    setIsCorrect(null);
    setShowSolution(false);
  };

  const handleNext = () => {
  setSelected(null);
  setSubmitted(false);
  setIsCorrect(null);
  setShowSolution(false);

  if (currentIndex + 1 < questions.length) {
    setCurrentIndex((i) => i + 1);
  } else {
    navigate("/result", {
      state: {
        score,
        total: questions.length,
        incorrectAttempts,
        totalTime: totalTimeRef.current,
      },
    });
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 px-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl rounded-2xl shadow-xl">
        <CardHeader className="space-y-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span>{time}s</span>
          </div>
          <Progress value={progress} />
        </CardHeader>

        <CardContent className="space-y-7">
          <h2 className="text-lg md:text-xl font-semibold leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* OPTIONS */}
          <div className="grid gap-4">
            {currentQuestion.options.map((opt) => {
              let cls =
                "w-full text-left px-5 py-3 rounded-xl border text-sm transition-all duration-200";

              if (submitted && opt === selected) {
                cls += isCorrect
                  ? " bg-green-100 border-green-500"
                  : " bg-red-100 border-red-500";
              } else if (opt === selected) {
                cls += " bg-indigo-50 border-indigo-500";
              } else {
                cls += " hover:bg-gray-50 hover:border-gray-300";
              }

              return (
                <button
                  key={opt}
                  onClick={() => !submitted && setSelected(opt)}
                  className={cls}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* FEEDBACK */}
          {submitted && !isCorrect && (
            <p className="text-sm text-red-600">
              Incorrect answer. Please retry.
            </p>
          )}

          {submitted && isCorrect && (
            <p className="text-sm text-green-600">
              Correct answer.
            </p>
          )}

          {/* SOLUTION */}
          {submitted && showSolution && (
            <div className="p-4 bg-gray-50 border rounded-xl text-sm leading-relaxed">
              <span className="font-semibold">Solution:</span>{" "}
              {currentQuestion.solution}
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap justify-end gap-3 pt-4">
            <Button
              variant="outline"
              disabled={!submitted}
              className="h-11 px-5 hover:bg-gray-100"
              onClick={() => setShowSolution((s) => !s)}
            >
              {showSolution ? "Hide Solution" : "Solution"}
            </Button>

            {!submitted && (
              <Button
                onClick={handleSubmit}
                disabled={!selected}
                className="h-11 px-6 bg-indigo-600 hover:bg-indigo-700"
              >
                Submit
              </Button>
            )}

            {submitted && !isCorrect && (
              <Button
                variant="outline"
                className="h-11 px-6 hover:bg-gray-100"
                onClick={handleRetry}
              >
                Retry
              </Button>
            )}

            {submitted && isCorrect && (
              <Button
                onClick={handleNext}
                className="h-11 px-6 bg-green-600 hover:bg-green-700"
              >
                {currentIndex + 1 === questions.length
                  ? "Finish Quiz"
                  : "Next"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;
