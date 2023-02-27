import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { pathname } = router
  console.log(pathname)
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
    <div className='w-screen min-h-screen ' >
      <Header />
      <section className='flex'>
        <Sidebar />
        <div className='py-3 px-8 md:py-5 md:px-10'>
          {
            props.children
          }
        </div>
      </section>
    </div >
  )
}