export const fetchQuizQuestions = async ({ subject, count }) => {
  const res = await fetch(
    "https://api.paraheights.com/edzy-api/hackathon/task/quizDetails",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        examSubjectName: subject,
        numberOfQuestions: count,
      }),
    }
  );

  const json = await res.json();

  return json.data.questions.map((q) => {
    const correctOptionId = q.questionInfo.option;

    // SAFETY: ensure optionOrdering exists and is an array
    const options = Array.isArray(q.optionOrdering)
      ? q.optionOrdering.map((opt) => opt.text)
      : [];

    const correctAnswer = q.optionOrdering?.find(
      (opt) => opt._id === correctOptionId
    )?.text;

    return {
      id: q._id,
      question: q.text,
      options,
      correctAnswer,
      solution: q.questionInfo?.solution || "",
    };
  });
};
