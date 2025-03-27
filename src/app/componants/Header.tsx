'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);
    const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const storedIndex = localStorage.getItem("activeIndex");
        if (storedIndex !== null) {
            setActiveIndex(parseInt(storedIndex));
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            console.log("Searching for:", searchQuery);
        }
    };

    const handleLinkClick = (index) => {
        setActiveIndex(index);
        localStorage.setItem("activeIndex", index);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Signup data:", signupData);
        setIsLoggedIn(true);
        setIsSignupFormOpen(false);
        setIsUserDropdownOpen(false);
        setSignupData({ name: '', email: '', password: '' });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", loginData);
        setIsLoggedIn(true);
        setIsLoginFormOpen(false);
        setIsUserDropdownOpen(false);
        setLoginData({ email: '', password: '' });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsUserDropdownOpen(false);
    };

    const links = [
        "Office Space", "Coworking", "Virtual Space", "Meeting Rooms",
        "Private Office", "Day Office", "Hot Desks", "Dedicated Desks"
    ];

    return (
        <div>
            <nav className="bg-white shadow-md w-full fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                    {/* Top Bar with Logo, Search and Contact */}
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <button
                                className="md:hidden text-gray-800 mr-2"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {!isOpen ? <Menu size={24} /> : <X size={24} />}
                            </button>
                            <Link href="/" className="text-xl font-semibold text-gray-800">Conference</Link>
                        </div>

                        {/* Search Bar - Hidden on mobile */}
                        <div className="hidden md:flex flex-1 justify-center mx-4">
                            <div className="relative flex items-center w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="px-4 h-10 border w-full focus:outline-none focus:ring-2 focus:ring-[#6BB7BE]"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="h-10 flex items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium absolute right-0"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Contact and User Auth Buttons - Hidden on mobile */}
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/contact"
                                className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
                            >
                                Contact
                            </Link>
                            
                            <div className="relative">
                                <button
                                    onClick={toggleUserDropdown}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <User size={24} className="text-gray-700" />
                                </button>
                                
                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        {!isLoggedIn ? (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setIsSignupFormOpen(true);
                                                        setIsLoginFormOpen(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Sign Up
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsLoginFormOpen(true);
                                                        setIsSignupFormOpen(false);
                                                    }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Login
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Swiper - Visible on all screens */}
                    <div className="relative w-full py-2">
                        <div className="flex items-center">
                            {/* Left Navigation Button */}
                            <button
                                className={`hidden sm:flex items-center justify-center w-8 h-8 mr-1 rounded-full ${isBeginning ? 'text-gray-300 cursor-default' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
                                disabled={isBeginning}
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="flex-1 overflow-hidden">
                                <Swiper
                                    slidesPerView={'auto'}
                                    spaceBetween={8}
                                    loop={false}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                        setIsBeginning(swiper.isBeginning);
                                        setIsEnd(swiper.isEnd);
                                    }}
                                    onSlideChange={(swiper) => {
                                        setIsBeginning(swiper.isBeginning);
                                        setIsEnd(swiper.isEnd);
                                    }}
                                    modules={[Navigation]}
                                    className="!px-0"
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 8
                                        },
                                        640: {
                                            slidesPerView: 3,
                                            spaceBetween: 8
                                        },
                                        768: {
                                            slidesPerView: 4,
                                            spaceBetween: 12
                                        },
                                        1024: {
                                            slidesPerView: 6,
                                            spaceBetween: 16
                                        }
                                    }}
                                >
                                    {links.map((item, index) => {
                                        const path = `/${item.toLowerCase().replace(/\s+/g, "-")}`;
                                        return (
                                            <SwiperSlide
                                                key={index}
                                                style={{
                                                    width: 'auto',
                                                    paddingLeft: '2px',
                                                    paddingRight: '2px'
                                                }}
                                            >
                                                <Link href={path} legacyBehavior>
                                                    <a
                                                        className={`
                                                            cursor-pointer 
                                                            text-xs sm:text-sm md:text-base 
                                                            text-gray-600 hover:text-gray-900 
                                                            font-medium 
                                                            whitespace-nowrap 
                                                            px-1 sm:px-2 py-1
                                                            relative 
                                                            transition-colors 
                                                            ${pathname === path ? 'text-gray-900 font-semibold' : ''}
                                                        `}
                                                        onClick={() => handleLinkClick(index)}
                                                    >
                                                        {item}
                                                        {pathname === path && (
                                                            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[2px] bg-[#6BB7BE] rounded-full"></span>
                                                        )}
                                                    </a>
                                                </Link>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>

                            {/* Right Navigation Button */}
                            <button
                                className={`hidden sm:flex items-center justify-center w-8 h-8 ml-1 rounded-full ${isEnd ? 'text-gray-300 cursor-default' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => !isEnd && swiperRef.current?.slideNext()}
                                disabled={isEnd}
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu - Shows search, contact and auth options */}
                    {isOpen && (
                        <div className="md:hidden bg-white pb-3">
                            <div className="px-2 space-y-3">
                                {/* Search in Mobile Menu */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="px-3 h-10 border w-full focus:outline-none focus:ring-2 focus:ring-[#6BB7BE]"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="absolute right-0 top-0 h-10 flex items-center justify-center text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 font-bold bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
                                    >
                                        <Search size={18} />
                                    </button>
                                </div>

                                {/* Contact and Auth Buttons in Mobile Menu */}
                                <div className="space-y-2">
                                    <Link
                                        href="/contact"
                                        className="block text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium text-center text-sm"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contact
                                    </Link>
                                    
                                    {!isLoggedIn ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setIsSignupFormOpen(true);
                                                    setIsOpen(false);
                                                }}
                                                className="block w-full text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium text-center text-sm"
                                            >
                                                Sign Up
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsLoginFormOpen(true);
                                                    setIsOpen(false);
                                                }}
                                                className="block w-full text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium text-center text-sm"
                                            >
                                                Login
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="block w-full text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium text-center text-sm"
                                        >
                                            Logout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Signup Form Modal */}
            {isSignupFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xs sm:max-w-md mx-2">
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Sign Up</h2>
                        <form onSubmit={handleSignupSubmit}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full px-3 py-2 border rounded text-sm sm:text-base"
                                    value={signupData.name}
                                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-3 py-2 border rounded text-sm sm:text-base"
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4 sm:mb-5">
                                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-3 py-2 border rounded text-sm sm:text-base"
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsSignupFormOpen(false)}
                                    className="px-3 sm:px-4 py-1 sm:py-2 text-gray-700 border rounded hover:bg-gray-100 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 sm:px-4 py-1 sm:py-2 bg-[#6BB7BE] text-white rounded hover:bg-[#5aa5ac] text-sm sm:text-base"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Login Form Modal */}
            {isLoginFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-xs sm:max-w-md mx-2">
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Login</h2>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="mb-3 sm:mb-4">
                                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="login-email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="login-email"
                                    className="w-full px-3 py-2 border rounded text-sm sm:text-base"
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="mb-4 sm:mb-5">
                                <label className="block text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base" htmlFor="login-password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="login-password"
                                    className="w-full px-3 py-2 border rounded text-sm sm:text-base"
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsLoginFormOpen(false)}
                                    className="px-3 sm:px-4 py-1 sm:py-2 text-gray-700 border rounded hover:bg-gray-100 text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-3 sm:px-4 py-1 sm:py-2 bg-[#6BB7BE] text-white rounded hover:bg-[#5aa5ac] text-sm sm:text-base"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;