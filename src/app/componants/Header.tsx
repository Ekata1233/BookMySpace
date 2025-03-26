'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
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

    const handleLinkClick = (index, path) => {
        setActiveIndex(index);
        localStorage.setItem("activeIndex", index);
        router.push(path);
    };

    const links = [
        "Office Space", "Coworking", "Virtual Space", "Meeting Rooms", "Membership",
        "Business Address", "Event Space", "Private Office", "Custom Office", "Day Office",
        "Hot Desks", "Dedicated Desks", "Workplace Recovery"
    ];

    return (
        <div>
            <nav className="bg-white shadow-md w-full fixed top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link href="/" className="text-xl font-semibold text-gray-800">Conference</Link>

                        <div className="flex-1 flex justify-center">
                            <div className="relative flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="px-4 py-2 border rounded-md w-80 focus:outline-none focus:ring-2 focus:ring-[#6BB7BE]"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-4 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        <Link href="/login" className="text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-5 py-2 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium">Contact</Link>
                        
                        <button className="md:hidden text-gray-800" onClick={() => setIsOpen(!isOpen)}>
                            {!isOpen ? <Menu size={24} /> : <X size={24} />}
                        </button>
                    </div>

                    <div className="hidden md:flex flex-1 justify-center mt-10 items-center relative mb-5">
                        {!isBeginning && (
                            <button
                                className="absolute left-[-50px] z-10 mb-5"
                                onClick={() => swiperRef.current?.slidePrev()}
                            >
                                <ChevronLeft size={28} />
                            </button>
                        )}

                        <div className="w-full">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={6}
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
                            >
                                {links.map((item, index) => {
                                    const path = `/${item.toLowerCase().replace(/\s+/g, "")}`;
                                    return (
                                        <SwiperSlide key={index} className="flex justify-center mb-5">
                                            <span
                                                className={`cursor-pointer text-gray-600 hover:text-gray-900 font-medium whitespace-nowrap px-8 mb-5 relative ${pathname === path ? 'text-gray-900' : ''}`}
                                                onClick={() => handleLinkClick(index, path)}
                                            >
                                                {item}
                                                {pathname === path && (
                                                    <span className="absolute bottom-[-12px] left-0 w-full h-[3px] bg-[#6BB7BE]"></span>
                                                )}
                                            </span>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>

                        {!isEnd && (
                            <button
                                className="absolute right-[-50px] z-10 mb-5"
                                onClick={() => swiperRef.current?.slideNext()}
                            >
                                <ChevronRight size={28} />
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;