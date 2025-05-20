import React from 'react';
import { GrTechnology } from "react-icons/gr";
import { SiXdadevelopers } from "react-icons/si";
import { TbRibbonHealth } from "react-icons/tb";
import { FaArtstation } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CourseCategory() {
    const coursecategorys = [
        {
            title: "Technology & Programming",
            desc: "Master the latest technologies with courses on programming languages, web development",
            icon: <GrTechnology />,
            iconColor: "text-blue-500" // Icon color for Technology
        },
        {
            title: "Creative Arts & Design",
            desc: "Unlock your creative potential with courses in graphic design, photography, video editing",
            icon: <FaArtstation />,
            iconColor: "text-yellow-500" // Icon color for Creative Arts
        },
        {
            title: "Personal Development",
            desc: "Improve yourself and your career with courses that help you develop crucial soft skills",
            icon: <SiXdadevelopers />,
            iconColor: "text-green-500" // Icon color for Personal Development
        },
        {
            title: "Health & Wellness",
            desc: "Focus on personal well-being and professional growth with courses in mental health, fitness",
            icon: <TbRibbonHealth />,
            iconColor: "text-red-500" // Icon color for Health & Wellness
        }
    ];

    const navigate = useNavigate();
    
    const { courses } = useSelector((state) => state.admin);

    return (
        <div className='flex items-center justify-center mx-20'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 my-4 rounded-md">
                {
                    coursecategorys.map((category, index) => {
                        return (
                            <div key={index} className="p-9 text-center bg-white gap-3 max-w-[350px] rounded-md shadow-lg" onClick={() => navigate(`/courses/category/${category.title.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`)}>
                                <div className={`w-12 h-12 flex items-center justify-center text-[40px] text-green-950 rounded-full mx-auto`}>
                                    {category.icon}
                                </div>
                                <h3 className="text-[18px] font-semibold my-2 text-green-950 mb-4">{category.title}</h3>
                                <p className="text-[14px] text-opacity-5">{category.desc}</p>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default CourseCategory;

