import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuizs } from '../../redux/reducers/studentSlice';

function Quizess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { quizess, loading, error } = useSelector((state) => state.student);
  console.log(quizess)

  useEffect(() => {
    if (courseId) {
      dispatch(getQuizs(courseId));
    }
  }, [courseId, dispatch]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-800 text-center">Course Quizzes</h1>

      {loading && <p>Loading quizzes...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {quizess && quizess.length > 0 ? (
        <ul className="space-y-4">
          {quizess.map((quiz, index) => (
            <li key={quiz._id || index} className="border p-4 rounded shadow" onClick={()=> navigate(`/student/quizzes/${courseId}/${quiz._id}`)} >
              <p className="text-lg font-semibold">Quiz #{index + 1}</p>
              <p>{quiz._id}</p>
              <h1>
                {quiz.questions.questionText}
                {console.log(quiz.questions.questionText)}
              </h1>
              <p>Total Questions: {quiz.questions.length}</p>
              {/* You can add a 'Start Quiz' button here */}
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p className="text-gray-600">No quizzes available for this course.</p>
      )}
    </div>
  );
}

export default Quizess;

