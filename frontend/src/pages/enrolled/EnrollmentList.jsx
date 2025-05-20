import React, { useEffect, useState } from 'react'
import { getEnrolledments } from '../api/api'

function EnrollmentList() {
    const [enrollment, setEnrollment] = useState([])

    useEffect(() => {
        enrollmentData()
    })
    const enrollmentData = () => {
        const data = getEnrolledments();
        setEnrollment(data)
    }
    return (
        <div>
            <h1>EnrollmentList</h1>
            <div>
                {enrollment.map((enroll) => {
                    <ul>
                        <li>{enroll.studentName}</li>
                        <li>{enroll.email}</li>
                        <li>{enroll.courseId}</li>
                    </ul>
                })}
            </div>
        </div>
    )
}

export default EnrollmentList