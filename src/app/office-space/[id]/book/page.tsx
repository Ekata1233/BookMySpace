"use client"

import TimeCalendar from '@/app/componants/calender/page'
import { useParams } from 'next/navigation';
import React from 'react'

const BookOfficeSpace = () => {
  const params = useParams();
  const id = params.id; 

  console.log("id in book ; ", id);
  

  console
  return (
    <div className='mt-50'>
        <TimeCalendar />
    </div>
  )
}

export default BookOfficeSpace