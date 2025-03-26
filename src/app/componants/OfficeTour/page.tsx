import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import image1 from '../../../../public/tourroom1.png'
import image2 from '../../../../public/tourroom2.png'
import image3 from '../../../../public/tourroom3.png'
import image4 from '../../../../public/tourroom4.png'

const OfficeTour = () => {
    const imageData = [
        {
            src: image1,
            title: "Spacious Workspaces",
            text: "Experience the convenience and flexibility of our large office spaces. Ideal for growing teams, fostering creativity, and enhancing productivity."
        },
        {
            src: image2,
            title: "Modern Coworking",
            text: "Our coworking spaces are designed for collaboration, innovation, and networking. Work efficiently in a professional yet vibrant environment."
        },
        {
            src: image3,
            title: "Private Office Suites",
            text: "Enjoy the privacy of fully serviced office suites tailored to meet your business needs. A quiet, distraction-free workspace for peak performance."
        },
        {
            src: image4,
            title: "Luxury Conference Rooms",
            text: "Host your meetings in premium conference rooms equipped with state-of-the-art facilities for a seamless professional experience."
        },
    ];

    return (
        <div>
            <div className="mx-auto px-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 text-center pt-12">
                    Top-Tier Business Offices & Coworking Hubs in <span className="blue">Pune</span>
                </h1>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-500 text-center font-semibold py-5">
                    Empowering Workspaces That Scale with Your Success
                </h1>
                <div className="flex justify-center">
                    <Button className="text-base sm:text-lg md:text-xl lg:text-2xl text-white hover:text-[#6BB7BE] border border-[#6BB7BE] px-6 py-6 bg-[#6BB7BE] hover:bg-[#FAFAFA] font-medium rounded-none my-4">
                        Book Office Tour Now
                    </Button>
                </div>
            </div>
            <div className="container mx-auto px-4 my-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {imageData.map((item, index) => (
                        <div
                            key={index}
                            className="image-container shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            {/* Image */}
                            <Image src={item.src} alt={item.title} className="w-full h-80 object-cover" />
                            <div className="absolute inset-0 bg-black/50"></div>
                            {/* Title (Visible by Default, Hidden on Hover) */}
                            <h2 className="title-overlay">{item.title}</h2>

                            {/* Hover Description */}
                            <div className="hover-text text-base md:text-lg lg:text-xl xl:text-xl text-center px-4 md:px-6">
    <p>{item.text}</p>
</div>


                        </div>
                    ))}
                </div>
            </div>



        </div>
    );
};

export default OfficeTour;
