import React from 'react';
import { FaPhoneAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaArrowRight } from "react-icons/fa";
import { MdAccessTimeFilled, MdEmail } from "react-icons/md";
import Link from "next/link";
import { FaMapLocationDot } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <div className='bg-[#6BB7BE] text-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Main Footer Columns */}
        <div className='flex flex-col md:flex-row flex-wrap gap-8 justify-between'>

          {/* Brand/Contact Column - smaller width */}
          <div className='flex-[0.5] min-w-[160px]'>
            <h1 className='text-3xl font-bold mb-4'>Conference.</h1>
            {/* Contact info commented */}
          </div>

          {/* Quick Links Column */}
          <div className='flex-1 min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2 '>Quick Links</h3>
            <ul className='space-y-2'>
              <li><Link href="/about" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">About Us</Link></li>
              <li><Link href="/services" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Privacy Policy</Link></li>
              <li><Link href="/pricing" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Terms of Service</Link></li>
              <li><Link href="/blog" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Retun and Refund Policy</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className='flex-1 min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2'>Services</h3>
            <ul className='space-y-2'>
              <li><Link href="/meeting-rooms" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Meeting Rooms</Link></li>
              <li><Link href="/office-space" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Office Space</Link></li>
              <li><Link href="/virtual-space" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Virtual Space</Link></li>
              <li><Link href="/coworking" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Coworking Spaces</Link></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className='flex-1 min-w-[150px]'>
            <h3 className='font-semibold text-lg mb-4 border-b pb-2'>Support</h3>
            <ul className='space-y-2'>
              <li><Link href="/faq" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm sm:text-base md:text-lg leading-relaxed text-white py-2">Contact Us</Link></li>
              
            </ul>
          </div>

          {/* Legal Column */}
          <div className='flex-1 min-w-[250px] my-auto'>
            <h2 className='font-semibold text-3xl mb-4 border-b pb-2 mb-8'>Become a Partner</h2>
            <Link
              href="/vendor/registration"
              className="flex items-center gap-2 text-base sm:text-md md:text-lg lg:text-lg text-[#6BB7BE] hover:text-[#FAFAFA] border border-[#FAFAFA] px-4 py-3 bg-[#FAFAFA] hover:bg-[#6BB7BE] font-medium rounded-none mt-6 w-fit"
            >
              Apply for Partnership
              <FaArrowRight className="text-lg" />
            </Link>

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
