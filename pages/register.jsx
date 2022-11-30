import Head from 'next/head'
import Image from 'next/image'
import LoginForm from '../components/LoginForm'
import styles from '../styles/Home.module.css'
import Logo from '../images/logo.svg'
import snip1 from '../images/snip1.svg'
import snip2 from '../images/snip2.svg'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  return (
    <div  className='min-h-screen h-screen w-full '>
    <div className='flex w-full h-full'>


      <div className='w-6/12 h-full flex flex-col px-8 pt-6 mx-6 mt-4'>
        <p className='text-center w-8/12 pt-6 text-lg pb-8'>Registration</p>
        {/* <h2 className='text-6xl text-[blue] font-bold'>FEMTECH</h2>

        <h3 className='text-2xl text-[#2E05D4] font-bold py-6'>Good Morning Techy!</h3> */}

      <RegisterForm />
      </div>
      <div className=' flex items-start pt-24  w-6/12 h-full '>

        <div className='pt-16'>
        <Image src={snip1} />
        </div>
    
      <Image src={snip2} />
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

Register.authRequired = false;

export default Register