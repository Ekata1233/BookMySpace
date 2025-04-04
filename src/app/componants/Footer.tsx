import React from 'react';
import {  FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdAccessTimeFilled, MdEmail } from "react-icons/md";
import Link from 'next/link';
import { FaMapLocationDot } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='bg-[#6BB7BE] text-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Main Footer Columns - all in one row */}
        <div className='flex flex-col md:flex-row flex-wrap gap-8 justify-between'>
          
          {/* Brand/Contact Column */}
          <div className='min-w-[250px] flex-1'>
            <h1 className='text-3xl font-bold mb-4'>Conference.</h1>
            <div className='space-y-3'>
              <div className='flex items-start gap-2'>
                <FaMapLocationDot className='mt-1 flex-shrink-0' />
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white ">
                  3rd Floor, C307, Amanora Chamber, Amanora Mall, Hadapsar, Pune, Maharashtra 411028
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <MdAccessTimeFilled />
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white ">Mon-Sat: 9:30am-6:30pm</p>
              </div>
              <div className='flex items-center gap-2'>
                <FaPhoneAlt />
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white">+91 9272003735</p>
              </div>
              <div className='flex items-center gap-2'>
                <MdEmail />
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white ">info@conference.com</p>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className='min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link href="/about" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">About Us</Link></li>
              <li><Link href="/services" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Services</Link></li>
              <li><Link href="/pricing" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Pricing</Link></li>
              <li><Link href="/blog" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Blog</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className='min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2'>Services</h3>
            <ul className='space-y-2'>
              <li><Link href="/meeting-rooms" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Meeting Rooms</Link></li>
              <li><Link href="/conference-halls" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Conference Halls</Link></li>
              <li><Link href="/virtual-office" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Virtual Office</Link></li>
              <li><Link href="/coworking" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Coworking Spaces</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className='min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2'>Support</h3>
            <ul className='space-y-2'>
              <li><Link href="/faq" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Contact Us</Link></li>
              <li><Link href="/feedback" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Feedback</Link></li>
              <li><Link href="/help-center" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Help Center</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div className='min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2'>Legal</h3>
            <ul className='space-y-2'>
              <li><Link href="/privacy" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Terms of Service</Link></li>
              <li><Link href="/cookies" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Cookie Policy</Link></li>
              <li><Link href="/accessibility" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className='border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center'>
          <div className='flex space-x-4 mb-4 md:mb-0'>
            <Link href="#" className='hover:text-blue-200'><FaFacebook size={20} /></Link>
            <Link href="#" className='hover:text-blue-200'><FaTwitter size={20} /></Link>
            <Link href="#" className='hover:text-blue-200'><FaLinkedin size={20} /></Link>
            <Link href="#" className='hover:text-blue-200'><FaInstagram size={20} /></Link>
          </div>
          <div className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">
            © {new Date().getFullYear()} Conference. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;