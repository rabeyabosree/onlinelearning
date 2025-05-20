import React, { useState } from 'react';
import contactImg from '../../../assets/contact.jpg';
import { useDispatch } from 'react-redux';
import { contactUser } from '../../../redux/reducers/authslice';

function ContactUs() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(contactUser(formData))
    // Here you would normally send the data to your server or email
    alert('Form submitted successfully!');
    
  };

  return (
    <div className=" py-12 flex items-center justify-center bg-gray-200">

      {/* Form Container */}
      <div className="w-full max-w-screen-xl px-6 lg:px-0 flex flex-col lg:flex-row gap-12 items-center justify-center">

        {/* Left Section - Contact Form */}
        <div className="flex-1 w-full max-w-lg p-8">

          <h1 className="text-center text-3xl font-semibold text-green-900 mb-8">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-8 p-5">
            {/* Full Name */}
            <div className="flex flex-col">
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 rounded-md text-black"
                required
              />
            </div>

            {/* Email Address */}
            <div className="flex flex-col">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 rounded-md text-black"
                required
              />
            </div>

            {/* Message */}
            <div className="flex flex-col">
              <textarea
                name="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-2 rounded-md text-black bg-white"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-900 text-white px-8 py-2 rounded-md mt-2 hover:bg-green-700 transition-colors ease-in-out duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 w-full max-w-md flex justify-center">
          <img src={contactImg} alt="Contact" className="w-full rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105" />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;






