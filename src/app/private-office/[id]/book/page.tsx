"use client"

import TimeCalendar from '@/app/componants/calender/page'
import { useParams } from 'next/navigation';
import React from 'react'

const BookPrivateOffice = () => {
  const params = useParams();
  const id = params.id; 

  return (
    <div className='mt-50'>
        <TimeCalendar />
    </div>
  )
}

export default BookPrivateOffice