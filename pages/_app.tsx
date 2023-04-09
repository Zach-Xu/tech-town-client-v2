import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { SWRConfig } from 'swr'
import { fetcher, protectedFetcher } from '../lib/fetcher'
import { Provider, useSelector } from 'react-redux'
import store from '../redux/store'
import { useDispatch } from 'react-redux'
import { AppState, updateUser } from '../redux/reducers'
import useSWR from 'swr'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ResponseResult } from '../types/vo/response'
import { UserVO } from '../types/vo/userVO'
import InboxList from '../components/messages/InboxList'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { pathname } = router

  const dispatch = useDispatch()




  useSWR({ url: '/api/auth/refresh' }, protectedFetcher<ResponseResult<UserVO>, null>, {
    onSuccess(data, key, config) {
      // redirect to login page if authentication fails
      if (data.code !== 200 && pathname !== '/') {
        toast.error(data.msg)
        return router.push('/')
      }

      // update global user info on page refresh
      if (data.code === 200) {
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

  if (pathname.includes('/messages')) {
    return <MessageLayout><Component {...pageProps} /></MessageLayout>
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

const MessageLayout: React.FC<{ children: any }> = (props) => {

  return (
    <Layout>
      <div className='max-w-[900px] md:py-5 md:px-10 mt-2 md:mt-0 mx-2 md:mx-0 flex flex-col h-full'>
        <header className='bg-white font-semibold text-gray-500 py-2 px-4 rounded-md shadow-md text-center md:text-left'>My messages</header>
        <section className='my-4 border-l shadow-md rounded-md overflow-hidden flex-1 '>
          <div className='flex h-full'>
            <InboxList />
            {
              props.children
            }
          </div>
        </section>
      </div>
    </Layout>
  )
}