'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
    Menu, 
    X, 
    Search, 
    ChevronLeft, 
    ChevronRight, 
    User,
    Home,
    Users,
    Monitor,
    Clock,
    DoorClosed,
    CalendarDays,
    Sofa,
    Library
} from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('signup'); // Default to signup tab
    const [signupData, setSignupData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
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

        // Check auth status on mount
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLinkClick = (index) => {
        setActiveIndex(index);
        localStorage.setItem("activeIndex", index);
    };

    const validateSignup = () => {
        const newErrors = {};
        if (!signupData.name.trim()) newErrors.name = 'Name is required';
        if (!signupData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!signupData.password) {
            newErrors.password = 'Password is required';
        } else if (signupData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateLogin = () => {
        const newErrors = {};
        if (!loginData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!loginData.password) {
            newErrors.password = 'Password is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (!validateSignup()) return;

        setIsLoading(true);
        try {
            // Replace with your actual API call
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            localStorage.setItem('authToken', data.token);
            setIsLoggedIn(true);
            toast.success('Account created successfully!');
            setSignupData({ name: '', email: '', password: '' });
            setActiveTab('login');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!validateLogin()) return;

        setIsLoading(true);
        try {
            // Replace with your actual API call
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('authToken', data.token);
            setIsLoggedIn(true);
            toast.success('Logged in successfully!');
            setLoginData({ email: '', password: '' });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        toast.success('Logged out successfully!');
        router.push('/');
    };

    const links = [
        { name: "Office Space", icon: <Home size={18} className='blue '/> },
        { name: "Coworking", icon: <Users size={18} className='blue'/> },
        { name: "Virtual Space", icon: <Monitor size={18} className='blue'/> },
        { name: "Meeting Rooms", icon: <Library size={18} className='blue'/> },
        { name: "Private Office", icon: <DoorClosed size={18} className='blue'/> },
        { name: "Day Office", icon: <CalendarDays size={18} className='blue'/> },
        { name: "Hot Desks", icon: <Sofa size={18} /> },
        { name: "Dedicated Desks", icon: <Clock size={18} className='blue'/> }
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
                                aria-label="Toggle menu"
                            >
                                {!isOpen ? <Menu size={24} /> : <X size={24} />}
                            </button>
                            <Link href="/" className="text-xl font-semibold text-gray-800">
                                Conference
                            </Link>
                        </div>

                        {/* Search Bar - Hidden on mobile */}
                        <div className="hidden md:flex flex-1 mx-4 max-w-md">
                            <div className="relative flex items-center w-full">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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

                            <Link href="/auth">
                                <User className="h-10 w-10 blue ms-6" />
                            </Link>
                        </div>

                        {/* Mobile-only auth link */}
                        <Link href="/auth" className="md:hidden text-gray-800 ml-2">
                            <User className="h-5 w-5" />
                        </Link>
                    </div>

                    {/* Navigation Swiper - Visible on all screens */}
                    <div className="relative w-full py-2">
                        <div className="flex items-center">
                            {/* Left Navigation Button */}
                            <button
                                className={`hidden sm:flex items-center justify-center w-8 h-8 mr-1 rounded-full ${isBeginning ? 'text-gray-300 cursor-default' : 'text-gray-700 hover:bg-gray-100'}`}
                                onClick={() => !isBeginning && swiperRef.current?.slidePrev()}
                                disabled={isBeginning}
                                aria-label="Previous navigation"
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
                                            slidesPerView: 3,
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
                                        const path = `/${item.name.toLowerCase().replace(/\s+/g, "-")}`;
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
                                                            text-gray-600 hover:text-gray-900 
                                                            font-medium 
                                                            whitespace-nowrap 
                                                            px-1 sm:px-2 py-1
                                                            relative 
                                                            transition-colors 
                                                            flex flex-col items-center
                                                            ${pathname === path ? 'text-gray-900 font-semibold' : ''}
                                                        `}
                                                        onClick={() => handleLinkClick(index)}
                                                    >
                                                        <div className="mb-1 ">
                                                            {item.icon}
                                                        </div>
                                                        <span className="text-xs sm:text-sm md:text-base">
                                                            {item.name}
                                                        </span>
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
                                aria-label="Next navigation"
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
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Header;