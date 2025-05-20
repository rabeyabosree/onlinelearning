import axios from "axios"


const API_URL = "http://localhost:4900/api"


export const getEnrolledments = async () => {
    const response = await axios.get(`${API_URL}/enrollment`);
    return response.data
}

export const enrolledStudent = async () => {
    const response = await axios.post(`${API_URL / enrollment / enroll}`);
    return response
}

export const getQuiz = async (courseId) => {
    const response = await axios.get(`${API_URL}/quizzes/${courseId}`);
    return response.data
}

export const submitquiz = async (quizData) => {
    const response = await axios.post(`${API_URL}/quizzes/submit`, quizData);
    return response.data;
}
export const addReviws = async (courseId, reviews) => {
    const response = await axios.post(`${API_URL}/reviews/${courseId}`, reviews);
    return response.data;
}
export const getReviwes = async (courseId) => {
    const response = await axios.post(`${API_URL}/reviews/${courseId}`);
    return response.data;
}

export const allCourses = async () => {
    try {
        const response = await fetch(`${API_URL}/admin`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        return data; // Ensure this is returning the array of courses
    } catch (error) {
        console.error("Error fetching all courses:", error);
        throw error;
    }
};

export const enrolledCourses = async (coursId) => {
    const response = await axios.post(`${API_URL}/enrollment/enroll`, { coursId },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
    return response.data;
}

export const getenrolledCourses = async (coursId) => {
    const response = await axios.get(`${API_URL}/enrollment/enroll`, { coursId },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
    return response.data;
}

export const progressCourses = async (coursId, progress) => {
    const response = await axios.put(`${API_URL}/enrollment/progress`, { coursId, progress },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
    return response.data;
}

export const certification = async (coursId, studentId) => {
    try {
        // Make the API call to get the certificate
        const response = await axios.post(`${API_URL}/student/certification/${studentId}/${coursId}`);

        // Assuming the server sends back the PDF file buffer or a URL to the PDF
        if (response.data && response.data.pdfBuffer) {
            // You can handle the response and download or display the PDF
            // For example, if you want to force download the PDF:
            const pdfBlob = new Blob([response.data.pdfBuffer], { type: 'application/pdf' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(pdfBlob);
            link.download = 'certificate.pdf';
            link.click();
        }

        // Optionally reload the page after successful certification
        window.location.reload(); // Reloads the page after certification is processed

        return response.data;
    } catch (error) {
        console.error('Error generating certificate:', error);
        // You can return an error message or handle it as necessary
        throw new Error('Unable to generate certificate');
    }
};

export const getNotification = async () => {
    const response = await axios.get(`${API_URL}/enrollment/enroll`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
    return response.data;
}

export const markNotification = async (userId) => {
    const response = await axios.put(`${API_URL}/enrollment/enroll${userId}`, { userId },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
    );
    return response.data;
}

export const registerUser = async (userData) => {
    const data = await axios.post(`${API_URL}/auth/register`, userData);
    return data.data;
}

export const loginUser = async (userData) => {
    try {
        const data  = await axios.post(`${API_URL}/auth/login`, userData);  // Changed to `/auth/login` as per standard REST API conventions

        // Store the received token in localStorage
        localStorage.setItem("token", data.token);

        // Return the user data
        return data.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export const getUser = async () => {
    const data = await axios.get(`${API_URL}/auth/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return data.data.user;
}

export const updateUser = async (updatedData) => {
    const data = await axios.put(`${API_URL}/auth/profile`, updatedData ,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });
    return data.data;
}