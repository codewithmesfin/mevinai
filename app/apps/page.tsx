"use client"

import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import LoadingIndicator from "@/components/LoadingIndicator";
import { USER } from "@/types/user";
import { useRouter } from "next/navigation";
import { APP_INFO } from "@/types/app";
import { getApps, getUserApps } from "@/redux/slices/saasSlice";
import show from "@/lib/toast";
import { modules } from "@/data";
import AppDetail from "./components/AppDetail";
import { getUserId } from "@/lib/auth";
import { getUserSites } from "@/redux/slices/userSlice";
import Link from "next/link";


export default function Apps() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setModalOpen] = useState<boolean>(false)
    const [app, setApp] = useState<APP_INFO>()
    const [user, setUser] = useState<USER>()
    const [loadingApps, setLoadingApps] = useState<boolean>(false)
    const [loadingUserApps, setLoadingUserApps] = useState<boolean>(false)

    const [apps, setApps] = useState<APP_INFO[]>([])
    const [userApps, setUserApps] = useState<APP_INFO[]>([])

    useEffect(() => {
        setLoadingApps(true)
        setLoadingUserApps(true)
        const userId = getUserId()
        if (userId) {
            getUserInfo(userId)
        }
    }, [])

    const getUserInfo = async (userId: string) => {
        const result = await dispatch(getUserSites(userId));
        if (result.type == "user/getUserSites/fulfilled") {
            const usr = result.payload?.user
            setUser(usr)
            const userSites = result.payload?.user?.sites
            if (!userSites || userSites?.length <= 0)
                router.push("/configuration")
            else getFrappeApps(usr)
        }
    }


    const getFrappeApps = async (usr: USER) => {
        const result = await dispatch(getApps());
        if (result.type == 'saas/getApps/rejected')
            show.error("Unable to fetch Frappe apps from the marketplace at this time. Try again after a moment.")
        if (result.type == "saas/getApps/fulfilled" && result?.payload?.apps && result?.payload?.apps.length > 0) {
            const resultingApps = result?.payload.apps
            const filteredModules: any = modules.filter(module => resultingApps.includes(module.appName));
            getUserFrappeApps(usr.siteName, filteredModules)
            setApps(filteredModules)
        }
        setLoadingApps(false)
    }

    const getUserFrappeApps = async (siteName: string, payload: APP_INFO[]) => {
        const result = await dispatch(getUserApps(siteName));
        if (result.type == "saas/getUserApps/fulfilled" && result?.payload?.apps && result?.payload?.apps.length > 0) {
            const usrApps = result?.payload.apps
            const filteredModules: any = payload.map(module => {
                return {
                    ...module,
                    alreadyInstalled: usrApps.map((x: string) => x.toLowerCase()).includes((module.appName).toLowerCase())
                }
            });
            setApps(filteredModules)
            const filteredUserApps = filteredModules.filter((module:APP_INFO) => usrApps.includes(module.appName));
            setUserApps(filteredUserApps)
        }
        setLoadingUserApps(false)
    }

    if (loadingApps)
        return (<div className='flex space-x-4 justify-center items-center h-screen'>
            <LoadingIndicator />
        </div>)


    return <div className="py-10 md:py-24">
        <AppDetail open={openModal} toggleModal={(buttonName) => {
            setModalOpen(!openModal)
            if (user && user.siteName && buttonName != "cancel") {
                setLoadingUserApps(true)
                getUserFrappeApps(user.siteName, apps)
            }
        }} app={app}
            siteName={user?.siteName || ""}
        />
        <div className="w-[90%] md:max-w-4xl mx-auto">
            <div>
                <h1 className="text-gray-700 font-extrabold text-2xl md:text-4xl">Get Frappe apps for free</h1>
                <p className="text-gray-600 py-2">
                    Enhance your Frappe site by easily finding and installing apps that fit your needs.
                </p>
            </div>
            <section className="py-10">
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-5">
                    <div className="py-3">
                        <h1 className="text-gray-800 text-lg font-bold">Featured Frappe apps</h1>
                        <p className="text-gray-500 py-1 text-sm">Start with our hand-picked apps for you.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {
                            apps.map((item: APP_INFO) => <div
                                key={item.title}
                                onClick={() => {
                                    setModalOpen(true)
                                    setApp(item)
                                }}
                                className="bg-white border border-gray-200 cursor-pointer hover:border-blue-400 rounded-xl p-5">
                                <div className="pb-1">
                                    <img src={item.image} alt=""
                                        className="w-8 h-8 rounded"
                                    />
                                </div>
                                <div className="w-full">
                                    <h1 className="text-lg font-medium text-gray-900">{item.title} </h1>
                                    <p className="line-clamp-2 text-gray-600 text-sm">{item.subtitle} </p>
                                </div>
                            </div>)
                        }
                    </div>

                </div>
            </section>
            <section className="pb-10">
                <div className="">
                    <div className="py-3">
                        <h1 className="text-gray-800 text-lg font-bold">Installed apps</h1>
                        <p className="text-gray-500 py-1 text-sm">Frappe apps that are already installed on site
                            <Link href={`http://${user?.siteName}`} target="_blank" className="text-blue-600 px-1">{user?.siteName}</Link>
                        </p>
                    </div>
                    {
                        loadingUserApps?<LoadingIndicator/>
                        :<div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-24">
                        {
                            userApps.map((item: APP_INFO) => <div
                                key={item.title}
                                onClick={() => {
                                    setModalOpen(true)
                                    setApp(item)
                                }} className="cursor-pointer">
                                <div className="flex space-x-2">
                                    <div className="w-16 mt-2">
                                        <img src={item.image} alt=""
                                            className="w-10 h-10 rounded"
                                        />
                                    </div>
                                    <div className="w-full border-b pb-4">
                                        <h1 className="text-lg font-medium text-gray-900">{item.title} </h1>
                                        <p className="line-clamp-1 text-gray-600 text-sm">{item.subtitle} </p>
                                    </div>
                                </div>
                            </div>)
                        }
                    </div>}

                </div>
            </section>
        </div>
    </div>
}