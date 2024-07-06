import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import { montserrat } from './fonts'
import Footer from '@/components/Footer'
import AuthProvider from '@/components/AuthProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//adding the meta data
//next js searches for this keyword called as the metadata as it is
export const metadata = {
  title:'Property-View | The ultimate rental place',
  description:'Find your perfect rental'
}

const MainLayout = ({children}) => {
  return (
    <AuthProvider>
      <html lang='en' className={montserrat.className}>
          <body>
              <Navbar />
              <div>{children}</div> 
              <Footer />  
              <ToastContainer />
          </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout