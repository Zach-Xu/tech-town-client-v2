import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'

const Home: NextPage = () => {
  return (
    <div className='flex flex-col space-y-4 md:flex-row min-h-screen w-screen md:items-center md:justify-center bg-[#f0f2f5]'>
      <div className='flex flex-col  p-5 px-10 text-xl mt-5 text-center md:text-left  max-w-[600px]'>
        <h1 className='text-blue-700 font-bold text-5xl md:-mt-20'>Tech Town</h1>
        <p className='py-6 px-3'>A social media platform for programmer at all levels. Make friends and network with developers on TechTown</p>
      </div>
      <div >

        <Login />
      </div>
    </div>
  )
}

export default Home
