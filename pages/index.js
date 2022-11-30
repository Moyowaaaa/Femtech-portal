import Head from 'next/head'
import Image from 'next/image'
import React from 'react';

import LoginForm from '../components/LoginForm'
import { useAuthContext } from '../store/contexts'
import styles from '../styles/Home.module.css'
import Logo from '../images/logo.svg'
import leftMan from '../images/left_man.svg'
import rightMan from '../images/right_man.svg'

function Home() {
  const [form, setForm] = React.useState();
  const [errors, setErrors] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const { login } = useAuthContext()

  const handleChange = React.useCallback(
    ({ target: { name, value }}) => {
        setForm(prevState => ({
          ...prevState,
          [name]: value
        }))
        setErrors(prevState => ({
          ...prevState,
          [name]: undefined
        }))
  }, [])

  const handleSubmit = React.useCallback((form) => {
    // api call goes here and then login with data from the api
    setLoading(true)
    setTimeout(() => {
      login()
      setLoading(false)
    }, 3000)
  }, [login])

  return (
    <div  className='min-h-screen h-screen w-full '>
      <div className='w-4/12 flex justify-center   object-contain'>
        <Image src={Logo} width={300} />
      </div>
      <div className='flex w-full h-full'>


        <div className='w-6/12 h-full flex flex-col px-8 pt-6 mx-6 mt-4'>
          {/* <p className='text-center'>Registration</p> */}
          {/* <h2 className='text-6xl text-[blue] font-bold'>FEMTECH</h2>

          <h3 className='text-2xl text-[#2E05D4] font-bold py-6'>Good Morning Techy!</h3> */}

          <LoginForm form={form} onChange={handleChange} loading={loading} errors={errors} onSubmit={handleSubmit} />
        </div>
        <div className=' flex items-start pt-24  w-6/12 h-full '>

        <Image src={leftMan} />
        <Image src={rightMan} />
        </div>
   


        {/* <div className='right flex flex-col  w-4/12 h-full justify-center'>
        <div className=' h-2/5 py-12 flex flex-col justify-between items-center'>
          <p className='font-bold text-5xl text-white'>10:00 AM</p>

          <div className='w-full text-white text-xl text-center px-2'>
            <p>“People who smile while they are 
alone used to be called insane until
we invented smartphones and social
media”
 - Mokokoma Mokhonoana.</p>
          </div>
        </div>

        </div> */}
      </div>
    </div>
  )
}

Home.authRequired = false;

export default Home;
