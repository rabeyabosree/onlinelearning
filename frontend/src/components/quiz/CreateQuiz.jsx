import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from '../../redux/reducers/adminSlice';
import { useParams } from 'react-router-dom';

function CreateQuiz() {
  const { id } = useParams(); // courseId from route param
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState({ courseId: "", questions: [] });
  const { loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    setQuiz((prev) => ({ ...prev, courseId: id }));
  }, [id]);

  const addQuestion = () => {
    setQuiz({
      ...quiz,
      questions: [...quiz.questions, {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: ""
      }]
    });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, opIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[opIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quiz.courseId) return alert("Course ID is missing");
    if (quiz.questions.length === 0) return alert("Please add at least one question");

    for (let i = 0; i < quiz.questions.length; i++) {
      const q = quiz.questions[i];
      if (!q.questionText.trim() || q.options.some(opt => !opt.trim()) || !q.correctAnswer.trim()) {
        return alert(`Fill all fields in question ${i + 1}`);
      }
    }

    try {
      await dispatch(createQuiz(quiz)).unwrap();
      alert("Quiz created successfully!");
      console.log(quiz)
      setQuiz({ courseId: id, questions: [] });
    } catch (err) {
      console.error("Error creating quiz:", err);
      alert(err.message || "Failed to create quiz");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create a New Quiz</h1>

      {quiz.questions.map((q, qIndex) => (
        <div key={qIndex} className="border rounded-md p-4 mb-4 bg-gray-50">
          <h2 className="font-semibold mb-2">Question {qIndex + 1}</h2>
          <input
            type="text"
            className="w-full border rounded-md p-2 mb-3"
            placeholder="Question text"
            value={q.questionText}
            onChange={(e) => handleQuestionChange(qIndex, "questionText", e.target.value)}
          />
          {q.options.map((opt, opIndex) => (
            <input
              key={opIndex}
              type="text"
              className="w-full border rounded-md p-2 mb-2"
              placeholder={`Option ${opIndex + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(qIndex, opIndex, e.target.value)}
            />
          ))}
          <input
            type="text"
            className="w-full border rounded-md p-2 mt-2"
            placeholder="Correct Answer"
            value={q.correctAnswer}
            onChange={(e) => handleQuestionChange(qIndex, "correctAnswer", e.target.value)}
          />
        </div>
      ))}

      <div className="flex gap-4 justify-between mt-6">
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          + Add Question
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md"
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error.message}</p>}
    </div>
  );
}

export default CreateQuiz;





