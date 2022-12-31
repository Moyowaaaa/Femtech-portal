import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'

import { useAuthContext } from '../store/contexts';
import success from '../images/success.svg'


const AttendanceSuccessful = () => {
	const { logout } = useAuthContext();

	const { back } = useRouter()
	
	return (
		<div  className='min-h-screen h-screen w-full items-center justify-center flex flex-col'>
			<Image src={success} alt="" />
			<div className='flex gap-2 flex-col items-center  py-4'>
				<h2 className='text-4xl font-bold '>Attendance Successful</h2>
				<p className='text-2xl font-bold'>Wish You A Safe Journey Home</p>
	
			  	<div className="flex items-center">
			  		<button 
							className='mx-6 px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'
							onClick={back}
						>
							BACK
						</button>
						<button 
							className='mx-6 px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'
							onClick={logout}
						>
							GO HOME
						</button>
					</div>
			
			</div>
			</div>
  )
}

AttendanceSuccessful.authRequired = true;

export default AttendanceSuccessful