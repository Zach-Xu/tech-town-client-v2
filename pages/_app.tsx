import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { pathname } = router

  if (pathname === '/') {
    return <Component {...pageProps} />
  }
  return (
    <Layout><Component {...pageProps} /></Layout>
  )
}

export default MyApp


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