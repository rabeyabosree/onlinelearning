import React, { useState } from 'react'
import { enrolledStudent } from '../api/api'
import { useNavigate } from 'react-router-dom';

function EnrolledCourse() {
    const studentInfo = {studentName: "", email: "", courseId: ""}
    const [student, setStudent] = useState(studentInfo)
    const navigate = useNavigate()
    const handleChange = (e) => {
        setStudent({...student, [e.target.name]: e.target.value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            enrolledStudent(student);
            alert("enrollment student")
            navigate('/')
        } catch (error) {
            alert(error.response?.data?.error)
            
        }

    }
  return (
   
    <div>
        <h1>enroll courses</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name='studentnName' placeholder='your name' onChange={handleChange} />
            <input type="email" name='email' placeholder='your email' onChange={handleChange} />
            <input type="text" name='courseId' placeholder='your courseId' onChange={handleChange} />
          <button>Submit</button>
        </form>
    </div>
  )
}

export default EnrolledCourse