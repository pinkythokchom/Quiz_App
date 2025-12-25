import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";

const Result = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    navigate("/");
    return null;
  }

  const { score, total, incorrectAttempts, totalTime } = state;

  const minutes = Math.floor((totalTime || 0) / 60);
  const seconds = (totalTime || 0) % 60;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-4">
      <Card className="w-full max-w-md rounded-2xl shadow-xl text-center">
        <CardHeader className="space-y-2">
          <h1 className="text-3xl font-serif font-extrabold text-emerald-700">
            Quiz Completed
          </h1>
          <p className="text-sm text-gray-500">
            Here is your performance summary
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* SCORE */}
          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-800">
              Final Score
            </p>
            <p className="text-2xl font-bold text-emerald-600">
              {score} / {total}
            </p>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-gray-500">Incorrect Attempts</p>
              <p className="text-lg font-semibold text-gray-800">
                {incorrectAttempts}
              </p>
            </div>

            <div className="rounded-xl border bg-gray-50 p-4">
              <p className="text-gray-500">Time Taken</p>
              <p className="text-lg font-semibold text-gray-800">
                {minutes}m {seconds}s
              </p>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 justify-center pt-4">
            <Button
              variant="outline"
              className="h-11 px-6 hover:bg-gray-100"
              onClick={() => navigate("/")}
            >
              Reattempt Quiz
            </Button>

            <Button
              className="
                h-11 px-6
                bg-emerald-600 hover:bg-emerald-700
                transition-colors
              "
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Result;
