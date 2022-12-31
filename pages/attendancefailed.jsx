import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'

import { useAuthContext } from '../store/contexts';

import failed from '../images/failed.svg'


const AttendanceFailed = () => {
	const { logout } = useAuthContext();

	const { back } = useRouter();

	return (
		<div  className='min-h-screen h-screen w-full items-center justify-center flex flex-col'>
				<Image src={failed} alt="" />
				<div className='flex gap-2 flex-col items-center  py-4'>
						<h2 className='text-4xl font-bold '>Ooops...</h2>
						<p className='text-2xl font-bold'>Unable To Record Your Atendance!</p>

						<div className='flex  gap-6'>
								<button 
									className='px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'
									onClick={back}
								>	
									RETRY
								</button>

								<button 
									className='px-12 rounded-md shadow-xl py-2 bg-[#1FAF38] text-lg font-bold text-white'
									onClick={logout}
								>
									LOGOUT
								</button>
						</div>
				</div>
				</div>
	)
}

AttendanceFailed.authRequired = true;

export default AttendanceFailed