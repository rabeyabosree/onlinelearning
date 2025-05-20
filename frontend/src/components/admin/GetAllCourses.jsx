import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCourses, getAllCourses } from '../../redux/reducers/adminSlice';
import { useDispatch, useSelector } from 'react-redux';

function GetAllCourses() {
  const { courses, loading, error } = useSelector((state) => state.admin);
  const [deleteConfirmationState, setDeleteConfirmationState] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const user = JSON.parse(localStorage.getItem("user"))
  console.log(user)

  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(getAllCourses());
    }
  }, [courses, dispatch]);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDeleteConfirmationState({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditCourse = (id) => navigate(`/edit-course/${id}`);
  const handleCreateQuiz = (id) => navigate(`/admin/courses/create-quiz/${id}`);

  const handleDeleteCourse = async (id) => {
    try {
      await dispatch(deleteCourses(id));
      setDeleteConfirmationState((prev) => ({
        ...prev,
        [id]: false,
      }));
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const toggleDeleteConfirmation = (id) => {
    setDeleteConfirmationState((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">All Courses</h1>

      <div className="space-y-4">
        {courses.length === 0 ? (
          <div className="text-center text-lg text-gray-500">No courses available.</div>
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="border p-4 rounded-lg shadow-md flex justify-between items-center relative hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              {/* Course Image and Info */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={course.thumbnailUrl || '/default-course-image.jpg'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className="font-medium text-lg text-gray-800">{course.title}</h2>
                  <p className="text-sm text-gray-500">{course.duration}</p>
                </div>
              </div>

              {/* Dropdown Menu - Only for Admin */}
              {user?.role === 'admin' && (
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDeleteConfirmation(course._id);
                    }}
                    className="text-xl text-gray-600 hover:text-gray-800"
                  >
                    &#8230;
                  </button>

                  {deleteConfirmationState[course._id] && (
                    <div
                      ref={dropdownRef}
                      className="absolute top-8 right-0 bg-white shadow-md rounded-md w-32 z-30 transition-all duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditCourse(course._id);
                        }}
                        className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCourse(course._id);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreateQuiz(course._id);
                        }}
                        className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100"
                      >
                        Create Quiz
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GetAllCourses;













/**
 * import React, { useState, useEffect } from 'react';
import { getAllCourses } from '../../pages/api/api';  // Assuming this is the API function you have

function GetAllCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await getAllCourses();
                setCourses(response); // Assuming `response` is an array of courses
            } catch (err) {
                console.error("Error fetching courses:", err);
                setError("Failed to load courses.");
            } finally {
                setLoading(false); // Set loading to false whether the fetch is successful or not
            }
        };

        fetchCourses();
    }, []); // The empty dependency array ensures this runs only once when the component mounts

    // Loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Error state
    if (error) {
        return <div>{error}</div>;
    }
    console.log(courses._id)

    // Display courses
    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">
                All Courses
            </h1>
            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course._id}
                        className="border p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                        <div className="flex items-center space-x-4">
                     
                            <div className="w-16 h-16 rounded-lg overflow-hidden">
                                <img
                                    src={course.videoUrl || '/default-course-image.jpg'}  // Fallback to default image if not available
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            
                            <div className="flex flex-col">
                                <h2 className="font-medium text-lg text-gray-800">{course.title}</h2>
                                <p className="text-sm text-gray-500"> {course.duration}</p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <a
                                href={`/courses/${course._id}`} 
                                className="text-blue-600 hover:text-blue-800"
                            >
                                View Details
                                {console.log(course._id)}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GetAllCourses;
 */

