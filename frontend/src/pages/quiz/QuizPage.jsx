import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz, submitQuiz } from "../../redux/reducers/studentSlice";

const QuizPage = () => {
  const { id: quizId, courseId } = useParams();
  const dispatch = useDispatch();

  const { quiz, loading, error, score, wrongAnswers } = useSelector(
    (state) => state.student
  );
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (quizId) {
      dispatch(getQuiz(quizId));
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quiz?.questions) {
      setAnswers(new Array(quiz.questions.length).fill(""));
      setCurrentQuestionIndex(0);
      setSubmitted(false);
      setMessage("");
    }
  }, [quiz]);

  const handleAnswerChange = (value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = value;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await dispatch(submitQuiz({ courseId, answers })).unwrap();
      setSubmitted(true);
      setMessage(`✅ Quiz submitted! Score: ${result.score}`);
      // NO setWrongAnswers here because wrongAnswers comes from Redux state
    } catch (error) {
      setMessage("🚨 Error submitting quiz");
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!quiz) return <div>No quiz found</div>;
  if (!quiz?.questions?.length || !quiz.questions[currentQuestionIndex])
    return <div>Loading question...</div>;

  const question = quiz.questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];

  const isWrong =
    submitted &&
    wrongAnswers?.some(
      (item) =>
        item.index === currentQuestionIndex &&
        item.submittedAnswer !== question.correctAnswer
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Quiz for Course: {courseId}</h2>

      <div className="mb-6">
        <p className={`font-semibold ${isWrong ? "text-red-600" : ""}`}>
          {currentQuestionIndex + 1}. {question.questionText}
        </p>
        <div className="mt-2 space-y-1">
          {question.options.map((option, optIndex) => (
            <label key={optIndex} className="block">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
                checked={selectedAnswer === option}
                disabled={submitted}
                onChange={() => handleAnswerChange(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
        {submitted && isWrong && (
          <p className="text-sm text-red-500 mt-2">
            ❌ Wrong! Correct: {question.correctAnswer}
          </p>
        )}
      </div>

      {!submitted && currentQuestionIndex < quiz.questions.length - 1 && (
        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
        >
          Next
        </button>
      )}

      {!submitted && currentQuestionIndex === quiz.questions.length - 1 && (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Quiz
        </button>
      )}

      {submitted && (
        <p className="mt-4 font-bold text-green-600">{message}</p>
      )}
    </div>
  );
};

export default QuizPage;






