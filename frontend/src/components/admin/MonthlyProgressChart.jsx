import React from 'react';

const MonthlyProgressChart = () => {
  // Months starting from September
  const months = [
    "September", "October", "November", "December", "January", "February", 
    "March", "April", "May", "June", "July", "August"
  ];

  // Example progress values (percentages for each month)
  const progressData = [
    70, 80, 60, 90, 75, 85, 50, 60, 80, 95, 70, 65
  ];

  return (
    <div className="w-full max-h-[400px] overflow-y-auto p-4">
      {months.map((month, index) => (
        <div key={month} className="flex flex-col mb-6">
          {/* Month Name */}
          <h4 className="text-lg font-semibold text-gray-800 mb-2">{month}</h4>
          
          {/* Progress Bar */}
          <div className="w-full h-4 bg-gray-300 rounded-full">
            <div
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${progressData[index]}%` }}
            ></div>
          </div>
          
          {/* Progress Percentage */}
          <span className="text-sm text-gray-600 mt-1">{progressData[index]}%</span>
        </div>
      ))}
    </div>
  );
};

export default MonthlyProgressChart;

