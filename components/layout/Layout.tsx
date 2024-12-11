"use client"

import { RootState } from '@/redux/store';
import dynamic from 'next/dynamic'
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from './Footer';
import SupportEmail from '../suport/SupportEmail';




const PrivateLayout = dynamic(() => import('./private/PrivateLayout'), { ssr: false })
const PublicNavbar = dynamic(() => import('./public/PublicNavbar'), { ssr: false })


interface PROPS {
  children: any;
}


const CustomLayout = ({ children }: PROPS) => {
  const [authenticated, setIsAuthenticated] = useState(false)

  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const pathname = usePathname()


  const isAuthPage = pathname.startsWith("/user")

  useEffect(() => {
    setIsAuthenticated(isAuthenticated)
  }, [authenticated, pathname]);


  return authenticated ?
    <PrivateLayout>
      {children}
      <SupportEmail />
    </PrivateLayout> :
    <>
      {!isAuthPage && <PublicNavbar />}
      {children}
      <SupportEmail />
      {!isAuthPage && <Footer />}
    </>


};

export default CustomLayout;