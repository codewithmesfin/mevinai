"use client"

import { getUserId, removeToken } from "@/lib/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "@/redux/store";
import { getUserSites } from "@/redux/slices/userSlice";
import LoadingIndicator from "@/components/LoadingIndicator";
import show from "@/lib/toast";
import { SITE, USER } from "@/types/user";
import { useRouter } from "next/navigation";
import Configure from "./components/Configure";
import NGINXInfo from "./components/NGINXInfo";
import SiteInfo from "./components/SiteInfo";
import SSLInfo from "./components/SSLInfo";
import ERPNextInfo from "./components/ERPNextInfo";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { LinkButton, OutlineLink } from "@/components";




export default function Configuration() {
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<USER>()
    const [site, setSite] = useState<SITE>()
    const router = useRouter()

    const [siteAvailable, setSiteAvailable] = useState(false)


    useEffect(() => {
        const userId = getUserId()
        if (userId) {
            getUserInfo(userId)
        }
    }, [])

    const getUserInfo = async (userId: string) => {
        const result = await dispatch(getUserSites(userId));

        if (result.type == "user/getUserSites/rejected" && error)
            show.error("Unable to get your SaaS information right now. Please try again after a few minutes.")
        if (result.type == "user/getUserSites/fulfilled") {
            const usr = result.payload?.user
            if (!usr) {
                removeToken()
                router.push("/user/login")
            }
            setUser(usr)
            const userSites = result.payload?.user?.sites
            if (userSites && userSites?.length > 0) {
                setSite(userSites[0])
                setSiteAvailable(true)
            }
        }
    }

    if (status == "loading")
        return (<div className='flex space-x-4 justify-center items-center h-screen'>
            <LoadingIndicator />
        </div>)

    if (!siteAvailable)
        return (<div className='w-[90%] md:max-w-2xl mx-auto md:flex md:space-x-4 justify-center items-center h-screen'>
            <Configure siteName={user?.siteName || ""} user={user} />
        </div>)

    return <div className="w-[90%] md:max-w-4xl mx-auto py-10 md:py-24">
        <div>
            <h1 className="text-gray-700 font-extrabold text-2xl md:text-4xl">SaaS information</h1>
            <p className="text-gray-600 py-2">
                Welcome to Mevinai — effortlessly launch ERPNext SaaS in Ethiopia, with free modules and apps; pay only for hosting!
            </p>
        </div>

        <div className="py-4 md:py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
                <SiteInfo site={site} user={user} />
                <NGINXInfo site={site} user={user} />
                <SSLInfo site={site} user={user} />
                <ERPNextInfo site={site} user={user} />
            </div>
        </div>

    </div>
}