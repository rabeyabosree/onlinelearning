import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getQuiz, submitQuiz } from "../../redux/reducers/studentSlice";

const QuizPage = () => {
  const { id: quizId, courseId } = useParams();
  const dispatch = useDispatch();

  const { quiz, loading, error } = useSelector((state) => state.student);

  const [answers, setAnswers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (quizId) {
      dispatch(getQuiz(quizId));
    }
  }, [dispatch, quizId]);

  useEffect(() => {
    if (quiz?.questions) {
      setAnswers(new Array(quiz.questions.length).fill(""));
    }
  }, [quiz]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    try {
      const response = await dispatch(submitQuiz({ courseId, answers }));

      if (response?.payload?.score !== undefined) {
        setMessage(`Quiz submitted! Score: ${response.payload.score}`);
      } else {
        setMessage("Failed to submit quiz");
      }
    } catch (err) {
      setMessage("Error submitting quiz");
    }
  };

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!quiz) return <div>No quiz found</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Quiz for Course: {courseId}</h2>

      <form>
        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-medium mb-2">{question.questionText}</h3>
            {question.options.map((option, i) => (
              <div key={i} className="ml-4">
                <input
                  type="radio"
                  id={`q${index}-opt${i}`}
                  name={`question-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                <label htmlFor={`q${index}-opt${i}`} className="ml-2">
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
      </form>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit Quiz
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default QuizPage;


