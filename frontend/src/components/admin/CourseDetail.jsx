import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById } from '../../redux/reducers/adminSlice';
import { getQuizs } from '../../redux/reducers/studentSlice';
import { useEffect } from 'react';

function CourseDetail() {
  const { courseId } = useParams();
  const dispatch = useDispatch();

  // ✅ Safe parse user from localStorage
  let user = null;
  try {
    const userData = localStorage.getItem("user");
    user = userData ? JSON.parse(userData) : null;

    if (user && user.name) {
      console.log("User Name:", user.name);
    } else {
      console.log("No user found or user has no name.");
    }
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
  }

  // Redux state
  const { selectedCourse: course, loading, error } = useSelector((state) => state.admin);
  const { quizess } = useSelector((state) => state.student);

  // Fetch course & quizzes
  useEffect(() => {
    if (courseId) {
      dispatch(getCourseById(courseId));
      dispatch(getQuizs(courseId));
    }
  }, [courseId, dispatch]);
console.log(course)
  // Loading & Error
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!course) return <div>No course data found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center text-blue-900 mb-6">{course.title}</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium text-gray-800">Instructor: {course.instructor}</h2>
          <p className="text-lg text-gray-600">{course.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800">Duration: {course.duration}</h3>
          <p className="text-lg text-gray-800">Price: {course.price}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800">
            Uploaded On: {new Date(course.createdAt).toLocaleString()}
          </h3>
        </div>

        <div className="flex justify-center">
          <video
            src = {course.videoUrl}
            controls
            className="bg-green-900 text-white px-8 py-3 rounded-md mt-4 hover:bg-green-700 transition-colors ease-in-out duration-300"
          >
            Watch Video
          </video>
        </div>

        {/* ✅ Show quiz button if quizzes exist */}
        {quizess && quizess.length > 0 && (
          <div className="flex justify-center">
            <Link
              to={`/student/courses/${courseId}/quizzes`}
              className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 hover:bg-blue-500"
            >
              Take Quiz
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;




