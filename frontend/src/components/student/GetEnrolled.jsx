import React, { useEffect, useState } from 'react'
import { certification, getenrolledCourses, progressCourses } from '../../pages/api/api'

function GetEnrolled() {
    const [enrolled, setEnrolled] = useState([]) // Initialize with an empty array

    useEffect(() => {
        const fetchEnrolled = async () => {
            const response = await getenrolledCourses()
            setEnrolled(response)
        }

        fetchEnrolled();
    }, []); // Add an empty dependency array to avoid infinite loop

    const updateProgress = async (courseId, progress) => {
        const response = await progressCourses(courseId, progress);
        setEnrolled(response); // Update state with the new progress
    }

    const getCertificate = async (courseId) => {
        const certicate = await certification(courseId)
    }

    return (
        <div>
            <h1>GetEnrolled</h1>
            <div>
                {enrolled.map((enroll) => (
                    <div key={enroll.course._id}>
                        {enroll.course.name} - {enroll.status} - progress: {enroll.progress} %
                        {enroll.status !== "complete" && ( // Check status instead of course
                            <button onClick={() => updateProgress(enroll.course._id, enroll.progress + 10)}>
                                Update Progress
                            </button>
                        )}

                        {enroll.status === "complete" && (
                            <button onClick={getCertificate(enroll._id)}>get certicate</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GetEnrolled;
