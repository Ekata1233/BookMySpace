import React from 'react';

const Footer = () => {
  return (
    <div className='bg-[#6BB7BE] text-white p-6'>
      <div className='grid grid-cols-5 gap-4'>
        <div className='col-span-1'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight sm:leading-snug md:leading-normal'>Conference.</h1>
        </div>
        <div className='col-span-1'>Column 2</div>
        <div className='col-span-1'>Column 3</div>
        <div className='col-span-1'>Column 4</div>
        <div className='col-span-1'>Column 5</div>
      </div>
    </div>
  );
};

export default Footer;
