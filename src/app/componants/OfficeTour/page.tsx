import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import image1 from '../../../../public/tourroom1.png'
import image2 from '../../../../public/tourroom2.png'
import image3 from '../../../../public/tourroom3.png'
import image4 from '../../../../public/tourroom4.png'

const OfficeTour = () => {
    const imageData = [
        { src: image1, text: "Enterprise" },
        { src: image2, text: "Coworking" },
        { src: image3, text: "Flexible" },
        { src: image4, text: "Serviced" },
    ];
    return (
        <div>
            <div className=" mx-auto px-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {imageData.map((item, index) => (
                        <div key={index} className="relative bg-gray-200 text-center">
                            {/* Image */}
                            <Image src={item.src} alt={item.text} className="w-full h-80 object-cover" />

                            {/* Overlay Text */}
                            <h2 className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black/50 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                                <span className="border-2 border-[#6BB7BE] px-4 py-2">{item.text}</span>
                            </h2>

                        </div>
                    ))}
                </div>
            </div>




        </div>
    )
}

export default OfficeTour