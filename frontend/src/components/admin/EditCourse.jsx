import React from 'react'
import { editCourses, getCourseById } from '../api/api';
import { useParams } from 'react-router-dom';

function EditCourse() {
    const coursedata = { title: "", description: "", instructor: "", duration: "", price: "" }
    const [course, setcourse] = useState(coursedata);
    const id = useParams()

    const handlchange = (e) => {
        setcourse({ ...course, [e.target.name]: [e.target.value] })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        editCourses(id, course);
        navigate('/')

    }

    const allCourse = async () => {
        const data = getCourseById(id);
        setcourse(data)
    }

    useEffect(() => {
        allCourse()
    }, [allCourse()]);
    return (
        <div>
            <h1>EditCourse</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' placeholder='Title' value={course.title} onChange={handlchange} />
                <input type="text" name='instructor' placeholder='instructor' value={course.instructor} onChange={handlchange} />
                <input type="text" name='description' placeholder='description' value={course.description} onChange={handlchange} />
                <input type="text" name='duration' placeholder='duration' value={course.duration} onChange={handlchange} />
                <input type="text" name='price' placeholder='price' value={course.price} onChange={handlchange} />
                <button >update</button>
            </form>
 
        </div>
    )
}

export default EditCourse