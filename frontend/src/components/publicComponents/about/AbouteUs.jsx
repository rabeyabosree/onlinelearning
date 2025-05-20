import React from 'react';
import about from "../../../assets/aboute2.webp";

function AbouteUs() {
  const aboutUs = [
    {id: "1" , name: "Quality Education", desc : "We ensure that every course meets"},
    {id: "2" , name: "Flexible Learning", desc : "We ensure that every course meets "},
    {id: "3" , name: "Diverse Course Offerings", desc : "We ensure that every course "},
    {id: "4" , name: "Certifications", desc : "We ensure that every course meets the "},
  ]
  return (
    <div className="h-screen flex items-center justify-center bg-slate-100 overflow-hidden">
     <div>
      <div className='flex items-center justify-center max-w-5xl'>
        <h1 className='bg-green-900 text-white px-6 py-2 text-[20px] rounded-md'>Why Choose Us</h1>
      </div>
     <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-8">
        {/* Left Section - Image and Labels */}
        <div className="relative w-full max-w-[500px] ">
          <img src={about} alt="About Us" className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Right Section - Text Content */}
        <div className="max-w-[550px]  grid grid-cols-2 gap-4 px-9 pr-16 shadow-sm">
         {
          aboutUs.map((about)=>(
            <div key={about.id} className='flex items-center gap-3  bg-white p-3 py-7'>
              <div className='text-center bg-green-900 text-white rounded-3xl p-1 px-4 my-6'>{about.id}</div>
              <div>
                <h1 className='text-[18px] font-semibold pb-2'>{about.name}</h1>
                <p className='text=[15px] opacity-90'>{about.desc}</p>
              </div>

            </div>
          ))
         }
        </div>
      </div>
     </div>
    </div>
  );
}

export default AbouteUs;
