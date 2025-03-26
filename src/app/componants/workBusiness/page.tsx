import React from "react";

const WorkBusiness = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Image Section */}
        <div className="relative flex justify-center items-center h-64 sm:h-80 md:h-96 lg:h-[28rem] xl:h-[32rem]">
          {/* Gray Square Behind Images */}
          <div className="absolute w-50 h-50 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gray-300 rounded-lg transform translate-x-8 sm:translate-x-12 md:translate-x-10 lg:translate-x-10 translate-y-4 sm:translate-y-6 md:-translate-y-10 lg:translate-y-0"></div>

          {/* Top Image */}
          <img
            src="/business_1.png"
            alt="Top Image"
            className="w-50 sm:w-40 md:w-55 lg:w-60 xl:w-64 shadow-lg transform translate-x-24 sm:translate-x-20 md:translate-x-24 lg:translate-x-32 xl:translate-x-40 -translate-y-4 sm:-translate-y-6 md:-translate-y-35 lg:-translate-y-27 absolute z-0"
          />

          {/* Bottom Image */}
          <img
            src="/business_2.png"
            alt="Bottom Image"
            className="w-70 sm:w-56 md:w-75 lg:w-80 xl:w-80 shadow-lg transform -translate-x-14 sm:translate-x-4 md:-translate-x-7 lg:-translate-x-20 xl:-translate-x-10 translate-y-30 sm:translate-y-20 md:translate-y-20 lg:translate-y-28 xl:translate-y-28 z-10"
          />
        </div>

        {/* Text Section */}
        <div className="px-0 sm:px-4 md:px-6 lg:px-8 xl:px-12 text-start">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight sm:leading-snug md:leading-normal">
            Work wherever business takes you.
          </h1>
          <p className="mt-4 sm:mt-6 md:mt-8 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            With over 4000 locations globally, we have offices, coworking
            spaces, and meeting rooms in every major town, city, and transport
            hub.
          </p>
          <p className="my-4 sm:my-6 text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            Whether you work alone, you're growing a start-up, or you're running
            the world's most successful corporation, our network makes it
            possible to work near clients, colleagues, or family.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkBusiness;