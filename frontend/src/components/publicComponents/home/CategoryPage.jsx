import React, { useState, useEffect } from 'react';
import CourseCategory from './CourseCategory';


function CategoryPage() {
    const initialPopularity = [
        { name: "36.7k", details: "student enrolled" },
        { name: "26.5k", details: "class completed" },
        { name: "100%", details: "satisfaction rate" },
        { name: "473+", details: "top instructors" },
    ];


    // Function to parse the 'name' value from popularity (e.g., "36.7k", "473+" to numbers)
    const parseName = (name) => {
        if (name.endsWith('k')) {
            return parseFloat(name.replace('k', '')) * 1000; // e.g., "36.7k" becomes 36700
        }
        if (name.endsWith('+')) {
            return parseInt(name.replace('+', ''));
        }
        if (name.endsWith('%')) {
            return 100; // Assuming the percentage is always 100%
        }
        return parseInt(name);
    };

    const [popularity, setPopularity] = useState(initialPopularity);
    const [currentValues, setCurrentValues] = useState(
        popularity.map((item) => {
            const targetValue = parseName(item.name);
            // Set initial value to 80 less than the target value (i.e., 20% less)
            return targetValue - 80; // 80 less than the target value
        })
    );

    useEffect(() => {
        // Create an interval to animate each counter independently
        const interval = setInterval(() => {
            setCurrentValues((prevValues) => {
                return prevValues.map((value, index) => {
                    const targetValue = parseName(popularity[index].name);
                    // If the current value is less than the target, increment it
                    if (value < targetValue) {
                        return Math.min(value + 1, targetValue); // Ensure value does not exceed target
                    }
                    return value; // Stop incrementing once the target is reached
                });
            });
        }, 10); // Increment every 10ms for smooth transition

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [popularity]);

    return (
        <div className='bg-slate-100 h-screen flex flex-col items-center justify-center gap-8'>

            <div className='flex items-center justify-center gap-9'>
                {popularity.map((populer, index) => (
                    <div className='p-4 bg-white text-center mx-5 rounded-md' key={index} >
                        <h1 className={`text-[30px] font-bold 
                            ${index === 0 ? 'text-red-500' : ''}
                            ${index === 1 ? 'text-blue-500' : ''}
                            ${index === 2 ? 'text-green-500' : ''}
                            ${index === 3 ? 'text-yellow-500' : ''}`}
                        >
                            {populer.name.endsWith('%')
                                ? currentValues[index] + "%" // For percentage
                                : currentValues[index] // Otherwise just display the number
                            }
                        </h1>
                        <h2>{populer.details}</h2>
                    </div>
                ))}
            </div>

            <div>
                <CourseCategory />
            </div>
        </div>
    );
}

export default CategoryPage;


/**
 * import React from 'react';
import CourseCategory from './CourseCategory';

function CategoryPage() {
    const popularity = [
        { name: "36.7k", details: "student enrolled" },
        { name: "26.5k", details: "class completed" },
        { name: "100%", details: "satisfaction rate" },
        { name: "473+", details: "top instructors" },
    ];

    const interval = setInterval(()=>{
        if({popularity.name})
    })

    return (
        <div className='bg-slate-200'>
            <div></div>

            <div className='flex items-center justify-center p-8'>
                {popularity.map((populer, index) => (
                    <div className='p-4 bg-white text-center mx-5' key={index}>
                       <h1 className={`text-[30px] font-bold 
                            ${index === 0 ? 'text-red-500' : ''}
                            ${index === 1 ? 'text-blue-500' : ''}
                            ${index === 2 ? 'text-green-500' : ''}
                            ${index === 3 ? 'text-yellow-500' : ''}`}
                       > 
                           {populer.name}
                       </h1>
                       <h2>{populer.details}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;





 */