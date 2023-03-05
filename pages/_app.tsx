import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { SWRConfig } from 'swr'
import { fetcher, protectedFetcher } from '../lib/fetcher'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { useDispatch } from 'react-redux'
import { updateUser } from '../redux/reducers'
import useSWR from 'swr'
import { User, Response } from '../types/responseTypes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { pathname } = router

  const dispatch = useDispatch()


  useSWR({ url: '/api/auth/refresh' }, protectedFetcher<Response<User>>, {
    onSuccess(data, key, config) {
      // redirect to login page if authentication fails
      if (data.code === 401 && pathname !== '/') {
        toast.error(data.msg)
        return router.push('/')
      }

      // update global user info on page refresh
      if (data.code === 200) {
        console.log('refresh user info', data)
        dispatch(updateUser(data.data!))
        if (pathname === '/') {
          return router.push('/home')
        }
      }

    },
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0

  })


  if (pathname === '/') {
    return <Component {...pageProps} />
  }
  return (
    <Layout><Component {...pageProps} /></Layout>
  )
}

export default function App(props: AppProps) {
  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher,
        }}

      >
        <MyApp {...props} />
        <ToastContainer />
      </SWRConfig>
    </Provider>
  )
}


const Layout: React.FC<{ children: any }> = (props) => {
  return (
    <div className='w-screen h-screen overflow-y-scroll flex flex-col bg-gradient-to-r from-white to-blue-200' >
      <Header />
      <section className='flex flex-1 '>
        <Sidebar />
        <main className='flex-1'>
          {
            props.children
          }
        </main>
      </section>
    </div >
  )
}