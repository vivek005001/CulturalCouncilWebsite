"use client";

import { Footer } from "flowbite-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdPhone } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const Foot = () => {
  return (
    <div>
      <Footer
        container
        className="relative bg-violet-950 bg-opacity-10 shadow-lg p-6"
      >
        <div className="absolute opacity-70 inset-0 backdrop-filter backdrop-blur-sm"></div>{" "}
        {/* Adding a blurred backdrop */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Mission Statement */}
          <div className="flex flex-col items-start">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src="/assets/images/CCLogo.png"
                alt="Cultural Council Logo"
                width={56} // Adjust size as needed
                height={56} // Adjust size as needed
              />
              <div className="border-l-2 border-gray-400 h-12 mx-4"></div>
              <Link href="https://www.iitmandi.ac.in/">
                <Image
                  src="/assets/images/IIT_logo.png"
                  alt="IIT Mandi Logo"
                  width={64} // Adjust size as needed
                  height={64} // Adjust size as needed
                />
              </Link>
            </div>
            <p className="text-neutral-100/[0.4]">
              The Cultural Council of IIT Mandi is dedicated to promoting
              cultural diversity and fostering a vibrant student community
              through various events and activities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <Link
              href="/events"
              className="text-neutral-100/[0.4] hover:text-white transition-all duration-200"
            >
              Events
            </Link>
            <Link
              href="https://photoclub.iitmandi.ac.in/index.php?sfpg=KipjMTMzODcyMGRiZjVhNmExNjUzM2Q1YTE3ZTJjMmRkZTFkMWIwNWIxMzUzMjNmMDcyZDBkZGQ5NWQ2Y2U0NGZk"
              className="text-neutral-100/[0.4] hover:text-white transition-all duration-200"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className="text-neutral-100/[0.4] hover:text-white transition-all duration-200"
            >
              Contact Us
            </Link>
            <Link
              href="/showcase"
              className="text-neutral-100/[0.4] hover:text-white transition-all duration-200"
            >
              About Us
            </Link>
          </div>

          {/* Contact Information and Social Media */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-bold text-white">Contact Us</h3>

            <div className="space-y-2">
              <a
                href="mailto:cultural_secretary@students.iitmandi.ac.in"
                className="flex items-center space-x-2 text-neutral-100/[0.4] hover:text-white transition-all duration-200"
              >
                <IoIosMail />
                <span>cultural_secretary@students.iitmandi.ac.in</span>
              </a>
              <a
                href="tel:+917417899100"
                className="flex items-center space-x-2 text-neutral-100/[0.4] hover:text-white transition-all duration-200"
              >
                <MdPhone />
                <span>Phone: +91 7417899100</span>
              </a>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Follow Us</h3>
              <Link
                href="https://www.instagram.com/culturals.iitmandi"
                className="flex items-center space-x-2 text-neutral-100/[0.4] hover:text-white transition-all duration-200"
              >
                <FaInstagram />
                <span>Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/culturalcouncil"
                className="flex items-center space-x-2 text-neutral-100/[0.4] hover:text-white transition-all duration-200"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="relative flex items-center justify-center mt-8">
          <Footer.Copyright
            href="#"
            by="Cultural Council IIT Mandi"
            year={new Date().getFullYear()}
            className="text-neutral-100/[0.4] hover:text-white transition-all duration-200"
          />
        </div>
      </Footer>
    </div>
  );
};

export default Foot;
