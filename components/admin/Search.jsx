import React from 'react'
import Image from 'next/image'
import SearchIcon from '../../images/search.svg'

const Search = () => {
  return (
    <div className=' py-4 flex flex-col gap-2'>Search

    <div className='flex '>
        <div className='rounded-l-md px-4 bg-[blue] flex flex-col items-center justify-center'>
            <Image src={SearchIcon} />
        </div>
        <input type="text" className='shadow pl-6 py-4 w-full rounded-r-md'
    placeholder='Search for students, events, documents...'
    />
    </div>

    </div>
  )
}

export default Search