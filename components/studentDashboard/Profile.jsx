import React from 'react'

const Profile = () => {
  return (
    <div className='shadow rounded-md border-2 border-[green] w-5/12 p-4 '>
        <h1 className='text-[#187DF3] font-bold text-2xl'>Profile</h1>
         <div class="border-t border-gray-200 mt-5">
            <dl>
              <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Student Name</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">John Doe</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Course</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">UI/UX Design</dd>
              </div>
              <div class="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Student ID</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">20/17AE/0057</dd>
              </div>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Duration</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">12 weeks</dd>
              </div>
            </dl>
        </div>    
    </div>
  )
}

export default Profile

// export default Profileimport React from 'react'

// const Profile = () => {
//   return (
//     <div className='shadow rounded-md border-2 border-[green] w-5/12 p-4 '>
        
//         <h1 className='text-[#187DF3] font-bold text-2xl'>Profile</h1>

//         {/*<h2 className='flex items-center gap-2 text-lg font-bold'>&larr; Back</h2>*/}


//         <div className='w-full flex flex-col items-center'>

//             {/*<div className='w-[15rem] h-[15rem] border-2 border-[blue] rounded-full'></div>*/}

//             <div className='mt-12'>
//             <div className='flex gap-2 border-b-2 border-dotted my-2'>
//                 <h3 className='font-bold'>STUDENT NAME:</h3>
//                 <p> JOHN DOE</p>
//             </div>
//             <div className='flex gap-2 border-b-2 border-dotted my-2'>
//                 <h3 className='font-bold'>COURSE:</h3>
//                 <p> UI/UX DESIGN</p>
//             </div>
//             <div className='flex gap-2 border-b-2 border-dotted my-2'>
//                 <h3 className='font-bold'>STUDENT ID:</h3>
//                 <p> 20/17AE/0057</p>
//             </div>
//             {/*<div className='flex gap-2 border-b-2 border-dotted my-2'>
//                 <h3 className='font-bold'>START DATE:</h3>
//                 <p> 20 SEPTEMBER 2022</p>
//             </div>
//             <div className='flex gap-2 border-b-2 border-dotted my-2'>
//                 <h3 className='font-bold'>END DATE:</h3>
//                 <p> 20 NOVEMBER 2022</p>
//             </div>
//             <div className='flex gap-2 border-b-2 border-dotted my-2'>
//                 <h3 className='font-bold'>EMAIL:</h3>
//                 <p> Johndoe222@gmail.com</p>
//             </div>*/}

//         </div>
//         </div>


      
        
//         </div>
//   )
// }

// export default Profile