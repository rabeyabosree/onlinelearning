import React, { useEffect, useState } from 'react';
import { getenrolledCourses } from '../../pages/api/api'; // Assuming this is your API function

function EnrolledCourses({ courseId }) {
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);  // To handle loading state
  const [error, setError] = useState(null);     // To handle error state


  const enrolledCourses = async () => {
    try {
      const data = await enrolledCourses();  // Assuming this function fetches the enrolled courses
      setEnrolled(data);  // Set the enrolled courses to state
    } catch (err) {
      setError('Failed to fetch enrolled courses');
      console.error(err);  // Log the error for debugging
    } finally {
      setLoading(false);  // Set loading to false once the API call is done
    }
  };

  enrolledCourses();  // Call the function to fetch enrolled courses
  useEffect(() => {
    const fetchEnrolled = async () => {
      const response = await getenrolledCourses()
      setEnrolled(response)
    }

    fetchEnrolled();
  })

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      
      <div>
        <button onClick={enrolledCourses({ courseId })}>enroll </button>
      </div>
    </div>
  );
}

export default EnrolledCourses;
