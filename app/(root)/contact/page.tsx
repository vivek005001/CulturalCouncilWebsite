'use client';
import React, { useState } from 'react';
import Image from 'next/image'; // Assuming you use Next.js Image component for optimized images
import { FaInstagram, FaLinkedin } from 'react-icons/fa'; // For social media icons

type TeamMember = {
  name: string;
  role: string;
  image: string;
  instagram?: string;
  linkedin?: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Vivek Aggarwal",
    role: "Cultural Secretary",
    image: "/assets/cc_core/Vivek_Aggarwal_Cultural_Secretary.jpg",
    instagram: "vivekaggarwal05",
    linkedin: "https://www.linkedin.com/in/vivek-aggarwal-b005b125a",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:your-email@example.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AMessage:%20${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center px-4 py-20 lg:py-40">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 max-w-md px-8 py-10 rounded-lg shadow-md mb-8 lg:mb-0 lg:py-16 mt-20 lg:mr-8">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-neutral-100 text-sm font-bold mb-2" htmlFor="name">Name</label>
            <input
              className="w-full px-3 py-2 text-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-neutral-100 text-sm font-bold mb-2" htmlFor="email">Email</label>
            <input
              className="w-full px-3 py-2 text-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-neutral-100 text-sm font-bold mb-2" htmlFor="message">Message</label>
            <textarea
              className="w-full px-3 py-2 text-neutral-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Cultural Secretary Section */}
      <div className="w-full lg:w-1/2 max-w-md px-8 py-6  rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row items-center space-x-4">
          <div className="flex-shrink-0">
            <Image
              src="/assets/cc_core/Vivek_Aggarwal_Cultural_Secretary.jpg"
              alt="Vivek Aggarwal"
              width={200}
              height={200}
              style={{
                borderRadius: '50%',
                width: '200px',
                height: '200px',
                objectFit: 'cover',
                border: '4px solid #fff',
              }}
            />
          </div>
          <div className="mt-4 lg:mt-0 lg:ml-4 text-center lg:text-left">
            <h3 className="text-xl font-bold text-white">Vivek Aggarwal</h3>
            <p className="text-neutral-400">Cultural Secretary</p>
            <p className="text-neutral-400">
              Phone: <a href="tel:7417899100" className="hover:text-white">7417899100</a>
            </p>
            <div className="flex justify-center lg:justify-start space-x-3 mt-2">
              <a href="https://www.instagram.com/vivekaggarwal05" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/vivek-aggarwal-b005b125a" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
