'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ChevronLeft, ChevronRight, User } from 'lucide-react';
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Label } from '@/components/ui/label';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        console.log("Signup data:", signupData);
        setIsLoggedIn(true);
        setSignupData({ name: '', email: '', password: '' });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", loginData);
        setIsLoggedIn(true);
        setLoginData({ email: '', password: '' });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
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
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-96 p-0" align="end">
                                    {isLoggedIn ? (
                                        <Card>
                                            <CardHeader>
                                                <CardTitle>Account</CardTitle>
                                                <CardDescription>
                                                    You are currently logged in.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardFooter>
                                                <Button 
                                                    onClick={handleLogout}
                                                    className="w-full"
                                                >
                                                    Logout
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ) : (
                                        <Tabs defaultValue="login" className="w-full">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="login">Login</TabsTrigger>
                                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="login">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Login</CardTitle>
                                                        <CardDescription>
                                                            Enter your credentials to access your account.
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <form onSubmit={handleLoginSubmit}>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="login-email">Email</Label>
                                                                <Input 
                                                                    id="login-email" 
                                                                    type="email" 
                                                                    value={loginData.email}
                                                                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="login-password">Password</Label>
                                                                <Input 
                                                                    id="login-password" 
                                                                    type="password" 
                                                                    value={loginData.password}
                                                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <Button type="submit" className="w-full mt-4">
                                                                Login
                                                            </Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="signup">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Sign Up</CardTitle>
                                                        <CardDescription>
                                                            Create a new account to get started.
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="space-y-4">
                                                        <form onSubmit={handleSignupSubmit}>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="name">Name</Label>
                                                                <Input 
                                                                    id="name" 
                                                                    value={signupData.name}
                                                                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="email">Email</Label>
                                                                <Input 
                                                                    id="email" 
                                                                    type="email" 
                                                                    value={signupData.email}
                                                                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="password">Password</Label>
                                                                <Input 
                                                                    id="password" 
                                                                    type="password" 
                                                                    value={signupData.password}
                                                                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <Button type="submit" className="w-full mt-4">
                                                                Sign Up
                                                            </Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
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
                                        <Tabs defaultValue="login" className="w-full">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="login">Login</TabsTrigger>
                                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="login">
                                                <Card>
                                                    <CardContent className="space-y-4 pt-4">
                                                        <form onSubmit={handleLoginSubmit}>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="mobile-login-email">Email</Label>
                                                                <Input 
                                                                    id="mobile-login-email" 
                                                                    type="email" 
                                                                    value={loginData.email}
                                                                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="mobile-login-password">Password</Label>
                                                                <Input 
                                                                    id="mobile-login-password" 
                                                                    type="password" 
                                                                    value={loginData.password}
                                                                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <Button type="submit" className="w-full mt-4">
                                                                Login
                                                            </Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                            <TabsContent value="signup">
                                                <Card>
                                                    <CardContent className="space-y-4 pt-4">
                                                        <form onSubmit={handleSignupSubmit}>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="mobile-name">Name</Label>
                                                                <Input 
                                                                    id="mobile-name" 
                                                                    value={signupData.name}
                                                                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="mobile-email">Email</Label>
                                                                <Input 
                                                                    id="mobile-email" 
                                                                    type="email" 
                                                                    value={signupData.email}
                                                                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="mobile-password">Password</Label>
                                                                <Input 
                                                                    id="mobile-password" 
                                                                    type="password" 
                                                                    value={signupData.password}
                                                                    onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                                                                    required
                                                                />
                                                            </div>
                                                            <Button type="submit" className="w-full mt-4">
                                                                Sign Up
                                                            </Button>
                                                        </form>
                                                    </CardContent>
                                                </Card>
                                            </TabsContent>
                                        </Tabs>
                                    ) : (
                                        <Button
                                            onClick={() => {
                                                handleLogout();
                                                setIsOpen(false);
                                            }}
                                            className="w-full"
                                        >
                                            Logout
                                        </Button>
                                    )}
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