import React from 'react'
import Attach from '../../images/attach.svg'
import Picture from '../../images/pictures.svg'
import Format from '../../images/format.svg'
import Image from 'next/image'

const Events = () => {
  return (
    <div className='shadow rounded-md w-full   h-auto '>
      <div className='w-full flex flex-col p-4 h-auto '>
      <textarea className='w-full h-full border-2 rounded-lg resize-none p-2 flex flex-col  placeholder:text-center placeholder:absolute placeholder:top-50 h-[25rem] '
      placeholder='Click here to type...'
      ></textarea>
      </div>
    
      <div className='event-options w-full  py-2'>
        <div className='flex justify-between py-2 px-4'>
          <div className='flex gap-2'>
            <div className='flex flex-col items-center'>
            <Image src={Attach} />
            <small>Attach</small>
            </div>

            <div className="flex flex-col items-center">
            <Image src={Picture} />
            <small>Pictures</small>
            </div>

            <div className="flex flex-col items-center">
            <Image src={Format} />  
<small>Format Text</small>
            </div>

          </div>


          <button className='bg-[#1FAF38] text-white  px-6 py-2 flex items-center  rounded-md shadow-md'>Create an event</button>

        </div>
        {/* <div className='flex justify-between px-4'>


          <div className='flex gap-2'>
            <div className="flex flex-col  items-center">
            <Image src={Attach} />
            <small>Attach</small>
            </div>

            <div className="flex flex-col items-center">
            <Image src={Picture} />
            <small>Pictures</small>
              
</div>

<div className="flex flex-col items-center">

<Image src={Format} />  
<small>Format Text</small>
</div>
            

           

         
          </div>

          <button className='bg-[#1FAF38] text-white  px-6 flex items-center  rounded-md shadow-md'>Create an event</button>


        </div> */}

      </div>
      </div>
  )
}

export default Events