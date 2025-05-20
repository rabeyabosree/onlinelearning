import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // In a real-world application, you would send the email to the server for processing.
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000); // Hide subscription success message after 3 seconds
  };

  return (
    <footer className="bg-green-950 text-white py-8 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Newsletter Section */}
          <div className="mb-8 lg:mb-0 text-center lg:text-left">
            <h2 className="text-3xl font-semibold">Subscribe to Our Newsletter</h2>
            <p className="mt-2 text-lg">Get the latest updates, news, and exclusive offers!</p>
          </div>

          {/* Subscribe Form */}
          <div className="flex items-center justify-center w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col lg:flex-row items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="px-4 py-2 rounded-md text-black"
                required
              />
              <button
                type="submit"
                className="mt-4 lg:mt-0 lg:ml-4 bg-yellow-500 text-green-950 px-6 py-2 rounded-md hover:bg-yellow-400 transition-colors"
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {isSubscribed && (
              <p className="text-green-300 mt-2">Thank you for subscribing!</p>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-colors">
            <FaFacebookF size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-colors">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-colors">
            <FaLinkedinIn size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-colors">
            <FaInstagram size={24} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-500 transition-colors">
            <FaYoutube size={24} />
          </a>
        </div>

        {/* Footer Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} [Your Company Name]. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

