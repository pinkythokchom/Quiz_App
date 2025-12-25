import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";

const StartQuiz = () => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [count, setCount] = useState("");

  const canStart = subject && count;

  const handleStart = () => {
    navigate("/quiz", {
      state: {
        subject,
        numberOfQuestions: Number(count),
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-gray-100 to-slate-200 px-4">
      <Card className="w-full max-w-md rounded-3xl shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-md">
        {/* Header */}
        <CardHeader className="space-y-2 text-center pb-2">
          <h1 className="text-3xl font-serif font-extrabold tracking-tight text-gray-900">
            Quiz Setup
          </h1>
          <p className="text-sm text-gray-500">
            Select subject and number of questions to begin
          </p>
        </CardHeader>

        <CardContent className="space-y-7 pt-4">
          {/* SUBJECT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Subject
            </label>

            <Select onValueChange={setSubject}>
              <SelectTrigger className="h-11 rounded-xl bg-white hover:bg-gray-50 transition">
                <SelectValue placeholder="Choose a subject" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="Class 10 - English">
                  Class 10 – English
                </SelectItem>
                <SelectItem value="Class 10 - Mathematics">
                  Class 10 – Mathematics
                </SelectItem>
                <SelectItem value="Class 10 - Science">
                  Class 10 – Science
                </SelectItem>
                <SelectItem value="Class 10 - Social Science">
                  Class 10 – Social Science
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* QUESTION COUNT */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Number of Questions
            </label>

            <Select onValueChange={setCount}>
              <SelectTrigger className="h-11 rounded-xl bg-white hover:bg-gray-50 transition">
                <SelectValue placeholder="Select count" />
              </SelectTrigger>

              <SelectContent className="bg-white">
                <SelectItem value="5">5 Questions</SelectItem>
                <SelectItem value="10">10 Questions</SelectItem>
                <SelectItem value="15">15 Questions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* START BUTTON */}
          <Button
            onClick={handleStart}
            disabled={!canStart}
            className={`
              w-full h-12 text-base font-semibold rounded-xl
              bg-gradient-to-r from-indigo-600 to-indigo-500
              hover:from-indigo-500 hover:to-indigo-600
              hover:shadow-xl hover:-translate-y-0.5
              transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:translate-y-0 disabled:hover:shadow-none
            `}
          >
            Start Quiz →
          </Button>

          {/* Helper text */}
          {!canStart && (
            <p className="text-xs text-center text-gray-400">
              Please select subject and number of questions
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StartQuiz;
