'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <nav className="bg-white shadow-md w-full fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href="/">
                            <span className="text-xl font-semibold text-gray-800 cursor-pointer">Conference</span>
                        </Link>

                        {/* Desktop Menu - Centered */}
                        <div className="hidden md:flex flex-1 justify-center space-x-12">
                            <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
                            <Link href="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</Link>
                            <Link href="/services" className="text-gray-600 hover:text-gray-900 font-medium">Services</Link>
                            <Link href="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact</Link>
                        </div>

                        {/* Login Button - Right Side */}
                        <div className="hidden md:flex">
                            <Link href="/login" className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium">Contact</Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-gray-800 focus:outline-none"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {!isOpen && <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu - Sliding from Left */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
                <button
                    className="absolute top-4 right-4 text-gray-800"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>
                <div className="px-4 pt-16 space-y-4">
                    <Link href="/" className="block text-gray-600 hover:text-gray-900 px-3 py-2 font-medium">Home</Link>
                    <Link href="/about" className="block text-gray-600 hover:text-gray-900 px-3 py-2 font-medium">About</Link>
                    <Link href="/services" className="block text-gray-600 hover:text-gray-900 px-3 py-2 font-medium">Services</Link>
                    <Link href="/contact" className="block text-gray-600 hover:text-gray-900 px-3 py-2 font-medium">Contact</Link>
                    <Link href="/login" className="block text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 py-2 rounded-md bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium">Contact</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
