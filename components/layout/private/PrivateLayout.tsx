"use client"

import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import SMPrivateNavbar from "./SMNavbar";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/redux/slices/userSlice";


interface PROPS {
    children: any;
}


export default function PrivateLayout({ children }: PROPS) {
    const [authenticated, setIsAuthenticated] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    const pathname = usePathname()
    const router = useRouter()



    useEffect(() => {
        setIsAuthenticated(isAuthenticated)
        if (!isAuthenticated) {
            signoutUser()
        }
    }, [authenticated, pathname]);

    const signoutUser = async () => {
        await dispatch(logout());
        router.push('/user/login');
    }


    return <div>
        <SMPrivateNavbar />
        <div className="pt-24 md:pt-0">
            <Sidebar />
            <section className={`md:ml-[150px] flex overflow-y-scroll flex-col flex-auto border-x border-gray-100`}>
                {children}
            </section>
        </div>
    </div>
}