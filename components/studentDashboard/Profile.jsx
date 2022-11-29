import React from 'react'

const Profile = () => {
  return (
    <div className='shadow rounded-md border-2 border-[green] w-5/12 p-4 '>
        
        <h1 className='text-[#187DF3] font-bold text-2xl'>Profile</h1>

        <h2 className='flex items-center gap-2 text-lg font-bold'>&larr; Back</h2>


        <div className='w-full flex flex-col items-center'>

            <div className='w-[15rem] h-[15rem] border-2 border-[blue] rounded-full'></div>

            <div className='mt-12'>
            <div className='flex gap-2 border-b-2 border-dotted my-2'>
                <h3 className='font-bold'>STUDENT NAME:</h3>
                <p> JOHN DOE</p>
            </div>
            <div className='flex gap-2 border-b-2 border-dotted my-2'>
                <h3 className='font-bold'>COURSE:</h3>
                <p> UI/UX DESIGN</p>
            </div>
            <div className='flex gap-2 border-b-2 border-dotted my-2'>
                <h3 className='font-bold'>STUDENT ID:</h3>
                <p> 20/17AE/0057</p>
            </div>
            <div className='flex gap-2 border-b-2 border-dotted my-2'>
                <h3 className='font-bold'>START DATE:</h3>
                <p> 20 SEPTEMBER 2022</p>
            </div>
            <div className='flex gap-2 border-b-2 border-dotted my-2'>
                <h3 className='font-bold'>END DATE:</h3>
                <p> 20 NOVEMBER 2022</p>
            </div>
            <div className='flex gap-2 border-b-2 border-dotted my-2'>
                <h3 className='font-bold'>EMAIL:</h3>
                <p> Johndoe222@gmail.com</p>
            </div>

        </div>
        </div>


      
        
        </div>
  )
}

export default Profile