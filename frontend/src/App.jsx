import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/publicPages/home/Home";
import ContactUs from "./components/publicComponents/contact/ContactPage";
import CreateCourse from './components/admin/CreateCourse';
import GetAllCourses from "./components/admin/GetAllCourses";
import RegisterPage from "./components/auth/RegisterPage";
import LoginPage from "./pages/auth/Login";
import UserProfile from './components/auth/profile/UserProfile';
import GetAllUsers from './components/admin/GetAllUsers';
import Setting from "./components/admin/Setting";
import AdminDashboard from './pages/admin/AdminDashnoard';
import AbouteUs from './components/publicComponents/about/AbouteUs';
import CourseDetail from "./components/admin/CourseDetail";
import Notification from "./components/student/Notification";
import CreateQuizForm from "./pages/quiz/CreateQuizForm";
import QuizPage from "./pages/quiz/QuizPage";
import PrivateRoute from "./privetRoutes/PrivetRoute";
import Certification from "./components/student/Certification";
import EnrolledCourses from "./components/student/EnrolledCourses";
import StudentDashboard from "./pages/student/StudentDashboar";
import ForgetPassowrd from "./components/auth/forget-password/ForgetPassowrd";
import ResetPassword from "./components/auth/forget-password/ResetPassword";
import VerifyPassword from "./components/auth/forget-password/VerifyPassword";
import CouresByCategory from "./pages/courses/CouresByCategory";
import CreateQuiz from "./components/quiz/CreateQuiz";
import EditCourse from "./pages/courses/EditCourse";
import Quizess from "./pages/quiz/Quizess";


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AbouteUs />} />
          <Route path="courses" element={<GetAllCourses />} />
          <Route path="courses/:courseId" element={<CourseDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget-password" element={<ForgetPassowrd />} />
          <Route path="/verify-code" element={<VerifyPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<UserProfile />} />

          <Route path="notification" element={<Notification />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute role="admin">
                <AdminDashboard />
              </PrivateRoute>
            }
          >
            <Route path="create" element={<CreateCourse />} />
            <Route path="courses" element={<GetAllCourses />} />

            <Route path="courses/create-quiz/:id" element={<CreateQuiz />} />
            <Route path="courses/:courseId/quizzes" element={<Quizess />} />
            <Route path="students" element={<GetAllUsers />} />
            <Route path="quizs" element={<Quizess />} />
            <Route path="settings" element={<Setting />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="courses/:id" element={<CourseDetail />} />
          </Route>

          <Route
            path="/student"
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          >
            <Route path="courses" element={<GetAllCourses />} />
            <Route path="enroll" element={<EnrolledCourses />} />
            <Route path="courses/:id" element={<CourseDetail />} />
            <Route path="courses/:courseId/quizzes" element={<Quizess />} />
             <Route path="quizzes/:courseId/:id" element={<QuizPage />} />
            <Route path="certification" element={<Certification />} />
            <Route path="settings" element={<Setting />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>


          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="/courses/category/:category" element={<CouresByCategory />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

