"use client"

import { getUserId } from "@/lib/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "@/redux/store";
import { getUserSites } from "@/redux/slices/userSlice";
import LoadingIndicator from "@/components/LoadingIndicator";
import show from "@/lib/toast";
import { SITE, USER } from "@/types/user";
import { useRouter } from "next/navigation";


export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { userSites, status, error } = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<USER>()
    const [site, setSite] = useState<SITE>()
    const router = useRouter()

    useEffect(() => {
        const userId = getUserId()
        if (userId) {
            getUserInfo(userId)
        }
    }, [])

    const getUserInfo = async (userId: string) => {
        const result = await dispatch(getUserSites(userId));
        if (result.type == "user/getUserSites/rejected" && error)
            console.log("Unable to get your SaaS information right now. Please try again after a few minutes.")
        if (result.type == "user/getUserSites/fulfilled") {
            const usr = result.payload?.user
            setUser(usr)
            const userSites = result.payload?.user?.sites
            if (!userSites || userSites?.length <= 0)
                router.push("/configuration")
            else setSite(userSites[0])
        }
    }

    if (status == "loading")
        return (<div className='flex space-x-4 justify-center items-center h-screen'>
            <LoadingIndicator />
        </div>)


    return <div className="md:p-64">
        Home page
    </div>
}