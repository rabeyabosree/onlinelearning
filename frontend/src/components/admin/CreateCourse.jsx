import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { addCourses } from '../../redux/reducers/adminSlice';


function CreateCourse() {
    const initialData = {
        title: "",
        description: "",
        instructor: "",
        duration: "",
        category: "",
        price: "",
        videoUrl: null
    };

    const [course, setCourse] = useState(initialData);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCourse({ ...course, videoUrl: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!course.title || !course.description || !course.instructor || !course.videoUrl) {
            alert('Please fill out all required fields.');
            return;
        }

        // Price validation
        if (isNaN(course.price) || course.price <= 0) {
            alert('Please enter a valid price.');
            return;
        }

        const formData = new FormData();
        Object.entries(course).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            setLoading(true);
            const resultAction = await dispatch(addCourses(formData));
            console.log("sending data", formData)
            if (addCourses.rejected.match(resultAction)) {
                // Handle rejection here (error from API)
                setError(resultAction.payload.message || 'Error adding course');
            } else {
                // If successful, navigate to another page or show success message
                navigate('/');
            }
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            setError('Error adding course, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">Create a New Course</h1>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">

                {/* Title */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        placeholder="Enter course title"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Instructor */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Instructor</label>
                    <input
                        type="text"
                        name="instructor"
                        value={course.instructor}
                        onChange={handleChange}
                        placeholder="Enter instructor name"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Course Description</label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Enter course description"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Duration */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="Enter course duration (e.g., 4 hours)"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        value={course.category}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Technology & Programming">Technology & Programming</option>
                        <option value="Creative Arts & Design">Creative Arts & Design</option>
                        <option value="Personal Development">Personal Development</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                    </select>
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        placeholder="Enter course price"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Video Upload */}
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Course Video</label>
                    <input
                        type="file"
                        name="videoUrl"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-700 text-white px-8 py-3 rounded-md mt-4 hover:bg-green-600 transition-all"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCourse;





/**
 * import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';  
import { addCourses } from '../../redux/reducers/adminSlice';


function CreateCourse() {
    const initialData = {
        title: "",
        description: "",
        instructor: "",
        duration: "",
        category: "",
        price: "",
        videoUrl: null
    };

    const [course, setCourse] = useState(initialData);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCourse({ ...course, videoUrl: e.target.files[0] });
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!course.title || !course.description || !course.instructor || !course.videoUrl) {
        alert('Please fill out all required fields.');
        return;
    }

    const formData = new FormData();
    Object.entries(course).forEach(([key, value]) => {
        formData.append(key, value);
    });

    try {
        setLoading(true);
        const resultAction = await dispatch(addCourses(formData));
        if (addCourses.rejected.match(resultAction)) {
            // Handle rejection here (error from API)
            setError(resultAction.payload.message || 'Error adding course');
        } else {
            // If successful, handle success (navigate, show success message)
            navigate('/');
        }
    } catch (error) {
        console.error('Error in handleSubmit:', error);
        setError('Error adding course, please try again.');
    } finally {
        setLoading(false);
    }
};


    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center text-blue-900 mb-6">Create a New Course</h1>

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">

                
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        value={course.title}
                        onChange={handleChange}
                        placeholder="Enter course title"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

               
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Instructor</label>
                    <input
                        type="text"
                        name="instructor"
                        value={course.instructor}
                        onChange={handleChange}
                        placeholder="Enter instructor name"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

              
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Course Description</label>
                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Enter course description"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="Enter course duration (e.g., 4 hours)"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Category</label>
                    <select
                        name="category"
                        value={course.category}
                        onChange={handleChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select category</option>
                        <option value="Technology & Programming">Technology & Programming</option>
                        <option value="Creative Arts & Design">Creative Arts & Design</option>
                        <option value="Personal Development">Personal Development</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                    </select>
                </div>

               
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        placeholder="Enter course price"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                
                <div className="flex flex-col">
                    <label className="text-lg text-gray-700 mb-1">Course Video</label>
                    <input
                        type="file"
                        name="videoUrl"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500"
                        required
                    />
                </div>

                
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-700 text-white px-8 py-3 rounded-md mt-4 hover:bg-green-600 transition-all"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateCourse;
 */