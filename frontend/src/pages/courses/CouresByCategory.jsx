import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useNavigate, useParams } from 'react-router-dom';
import { getAllCourses } from '../../redux/reducers/adminSlice';



function CoursesByCategory() {
  const { courses, loading, error } = useSelector((state) => state.admin);
  const {category} = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (!courses || courses.length === 0) {
      dispatch(getAllCourses());
    }
  }, [courses, dispatch]);
  
  // Normalize route param (e.g., "web-development" -> "web development")
  const formattedCategory = category.replace(/-/g, " ").toLowerCase();

  // Capitalize words for display
  const formatTitleCase = (text) =>
    text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));

  // Normalize helper to safely compare strings
  const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

  // Filter courses by matching normalized category
  const filteredCourses = courses?.filter(
    (course) => normalize(course.category) === normalize(formattedCategory)
  );

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 text-green-900">
        Courses in {formatTitleCase(formattedCategory)}
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading courses...</p>
      ) : filteredCourses?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              role="button"
              tabIndex="0"
              onClick={() => navigate(`/courses/${course.slug || course._id}`)}
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/courses/${course.slug || course._id}`)
              }
              className="bg-white p-6 shadow-md rounded-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-40 w-full object-cover rounded mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-green-800">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No courses found in this category.</p>
      )}
    </div>
  );
}

export default CoursesByCategory;



