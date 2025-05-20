import React, { useState } from "react";

const CreateQuizForm = () => {
  const [courseId, setCourseId] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: ["", "", "", ""], correctAnswer: "" }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index][name] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", options: ["", "", "", ""], correctAnswer: "" }
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/createquiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId, questions }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Quiz created successfully!");
      } else {
        setMessage(data.message || "Error creating quiz");
      }
    } catch (error) {
      setMessage("Error creating quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create a New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Course ID:</label>
          <input
            type="text"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {questions.map((question, index) => (
          <div key={index} className="mb-6 border p-4 rounded-md shadow-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Question {index + 1}:</label>
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-3">
                <label className="block text-sm font-medium text-gray-700">Option {optionIndex + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                  required
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Correct Answer:</label>
              <input
                type="text"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleInputChange(index, e)}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button
              type="button"
              onClick={() => handleRemoveQuestion(index)}
              className="text-red-600 hover:text-red-800"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="inline-block px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-4"
        >
          Add Question
        </button>

        <button
          type="submit"
          disabled={loading}
          className="inline-block px-6 py-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          {loading ? "Creating Quiz..." : "Create Quiz"}
        </button>
      </form>

      {message && <div className="mt-4 text-center text-lg text-gray-800">{message}</div>}
    </div>
  );
};

export default CreateQuizForm;

