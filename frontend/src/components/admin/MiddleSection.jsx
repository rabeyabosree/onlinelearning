import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SettingLayout from './SettingLayout';
import AdminHello from './AdminHello';
import GetAllCourses from './GetAllCourses';
import Setting from './Setting';
import AdminDashnoard from '../../pages/admin/AdminDashnoard';

function MiddleSection() {
    return (
        <Router>
            <SettingLayout /> {/* This will be the main layout that includes the sidebar */}

            {/* Define Routes here */}
            <Routes>
                <Route path="/dashboard" element={<AdminHello />} />
                <Route path="/courses" element={<GetAllCourses />} />
                <Route path="/lectures" element={<Lectue />} />
                <Route path="/settings" element={<Setting />} />
                <Route exact path="/admin" element={<AdminDashnoard />} /> {/* Default route */}
            </Routes>
        </Router>
    )
}

export default MiddleSection