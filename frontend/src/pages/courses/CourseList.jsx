import React, { useEffect, useState } from 'react';
import { deleteCourses, getAllCourses } from '../api/api';
import { useNavigate } from 'react-router-dom';

function CourseList() {
    const [course, setCourse] = useState([]);
    const navigate = useNavigate();

    // Fetch all courses
    const allCourse = async () => {
        const data = await getAllCourses(); // Ensure this is an async function
        setCourse(data);
    }

    useEffect(() => {
        allCourse(); // Call async function to load courses
    }, []); // Dependency array should be empty to avoid infinite loop

    // Handle course deletion
    const handleDelete = async (id) => {
        await deleteCourses(id);  // Assuming deleteCourses is an async function
        allCourse(); // Reload courses after deletion
    }

    return (
        <div>
            <h1>Course List</h1>
            <button onClick={() => navigate("/add-course")}>Add Course</button> {/* Add navigation to add new course */}
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Instructor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {course.map((cours) => (
                        <tr key={cours.id}>
                            <td>{cours.title}</td> {/* Fixed typo 'tile' to 'title' */}
                            <td>{cours.instructor}</td> {/* Fixed typo 'instruction' to 'instructor' */}
                            <td>
                                <button onClick={() => navigate(`/edit/${cours.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(cours.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CourseList;


/**
 *import React, { useEffect, useState } from 'react'
import { deleteCourses, getAllCourses } from '../api/api'
import { useNavigate } from 'react-router-dom';

function CourseList() {
    const [course, setCourse] = useState([]);
    const navigate = useNavigate();
    const allCourse = async () => {
        const data = getAllCourses();
        setCourse(data)
    }

    useEffect(() => {
        allCourse()
    }, []);

    const handleDelete = () => {
        deleteCourses(id)
        allCourse()
    }
    return (
        <div>
            <h1>CourseList</h1>
            <button> add course</button>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>instructor</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {course.map((cours) => (
                          <tr key={cours.id}>
                          <td>{cours.tile}</td>
                          <td>{cours.instruction}</td>
                          <button onClick={() => navigate(`/edit/${cours.id}`)}>edit</button>
                          <button onClick={handleDelete(cours.id)}>delete</button>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CourseList
 */