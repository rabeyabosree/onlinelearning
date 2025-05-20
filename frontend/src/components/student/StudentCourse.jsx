import React, { useEffect, useState } from 'react';
import { allCourses } from '../../pages/api/api';  // Assuming this is your API function
import EnrolledCourses from './EnrolledCourses';

function StudentCourse() {
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null);     // To manage error state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await allCourses();  // Make sure allCourses is an async function
        setCourse(data);  // Set the fetched data to state
      } catch (err) {
        setError('Failed to fetch courses');
        console.error(err);
      } finally {
        setLoading(false);  // Set loading to false once API call is done
      }
    };

    fetchCourses();  // Call the fetch function
  }, []);  // Empty dependency array means this effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;  // Loading state
  }

  if (error) {
    return <div>{error}</div>;  // Error handling
  }

  return (
    <div>
      <h2>Student Courses</h2>
      <ul>
        {course.length > 0 ? (
          course.map((courseItem) => (
            <li key={courseItem._id}>
              {courseItem.title} - {courseItem.instructor}

              <div>
                <EnrolledCourses courseId={course.id} />
              </div>
            </li>
          ))
        ) : (
          <p>No courses available</p>
        )}
      </ul>


    </div>
  );
}

export default StudentCourse;
