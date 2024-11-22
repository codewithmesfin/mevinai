"use client"

import { getUserId } from "@/lib/auth"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "@/redux/store";
import { getUserSites } from "@/redux/slices/userSlice";
import LoadingIndicator from "@/components/LoadingIndicator";
import { SITE, USER } from "@/types/user";
import { useRouter } from "next/navigation";
import { getUserApps } from "@/redux/slices/saasSlice";
import { APP_INFO } from "@/types/app";
import Link from "next/link";
import { modules } from "@/data";
import { Greeting, LinkButton } from "@/components";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";


export default function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const { status, error } = useSelector((state: RootState) => state.user);
    const [user, setUser] = useState<USER>()
    const [site, setSite] = useState<SITE>()
    const router = useRouter()
    const [loadingUserApps, setLoadingUserApps] = useState<boolean>(false)
    const [userApps, setUserApps] = useState<APP_INFO[]>([])
    const [configuration, setConfiguration] = useState({
        saas: false,
        site: false,
        nginx: false,
        ssl: false
    })


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
            else {
                getUserFrappeApps(usr?.siteName)
                setSite(userSites[0])
                const userSite = userSites[0]
                const config = {
                    saas: (userSite && userSite!.status == "site created") &&
                        (userSite?.nginx && userSite!.nginx!.status == "active") &&
                        (userSite?.ssl && userSite!.ssl!.status == "active"),
                    site: userSite && userSite!.status == "site created",
                    nginx: userSite?.nginx && userSite!.nginx!.status == "active",
                    ssl: userSite?.ssl && userSite!.ssl!.status == "active"
                }
                setConfiguration(config)
            }
        }
    }

    const getUserFrappeApps = async (siteName: string) => {
        setLoadingUserApps(true)
        const result = await dispatch(getUserApps(siteName));
        if (result.type == "saas/getUserApps/fulfilled" && result?.payload?.apps && result?.payload?.apps.length > 0) {
            const usrApps = result?.payload.apps
            const filteredModules: any = modules.map(module => {
                return {
                    ...module,
                    alreadyInstalled: usrApps.map((x: string) => x.toLowerCase()).includes((module.appName).toLowerCase())
                }
            });
            const filteredUserApps = filteredModules.filter((module: APP_INFO) => usrApps.includes(module.appName));
            setUserApps(filteredUserApps)
        }
        setLoadingUserApps(false)
    }



    if (status == "loading")
        return (<div className='flex space-x-4 justify-center items-center h-screen'>
            <LoadingIndicator />
        </div>)


    return <div className="py-10 md:py-32">
        <div className="w-[90%] md:max-w-4xl mx-auto">
            <section>
                <div>
                    <Greeting name={user?.firstName || ""} />
                </div>
            </section>
            {configuration.saas && <section className="py-6 md:py-16">
                <div className="md:flex justfify-center items-center md:space-x-6 space-y-6 md:space-y-0">
                    <div className="w-full sm:w-1/2">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-10">
                            <div>
                                <div className="md:flex items-center space-x-3">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-12">
                                        <CheckBadgeIcon aria-hidden="true" className="size-10 text-green-600" />
                                    </div>
                                    <div>
                                        <h1 className="font-bold text-gray-800 text-lg text-center md:text-left">SaaS Configured</h1>
                                        <p className="text-gray-600 text-center md:text-left">Your Frappe site <span className="text-blue-600">{user?.siteName}</span> has been created and configured successfully</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-center">
                                    <LinkButton
                                        title={"Go to ERPNext"}
                                        href={`http://${user?.siteName}`}
                                        showNextIcon
                                        openOnOtherTab
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-10">
                            <div className="pb-2">
                                <h1 className="font-bold text-gray-700 text-lg">Configuration detail</h1>
                            </div>
                            <div className="py-2">
                                {configuration.site &&
                                    <div className="flex  space-x-3">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-6">
                                            <CheckBadgeIcon aria-hidden="true" className="size-4 text-green-600" />
                                        </div>
                                        <h2 className="text-base font-medium text-gray-700">
                                            Frappe Site created
                                        </h2>
                                    </div>
                                }
                            </div>
                            <div className="py-2">
                                {configuration.nginx &&
                                    <div className="flex  space-x-3">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-6">
                                            <CheckBadgeIcon aria-hidden="true" className="size-4 text-green-600" />
                                        </div>
                                        <h2 className="text-base font-medium text-gray-700">
                                            Nginx configured to your domain name
                                        </h2>
                                    </div>
                                }
                            </div>
                            <div className="pt-2">
                                {configuration.ssl &&
                                    <div className="flex  space-x-3">
                                        <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-6">
                                            <CheckBadgeIcon aria-hidden="true" className="size-4 text-green-600" />
                                        </div>
                                        <h2 className="text-base font-medium text-gray-700">
                                            SSL Certificate installed to your domain name
                                        </h2>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>}
            <section className="pb-10">
                <div className="">
                    <div className="py-3">
                        <h1 className="text-gray-800 text-lg font-bold">Installed apps</h1>
                        <p className="text-gray-500 py-1 text-sm">Frappe apps that are already installed on site
                            <Link href={`http://${user?.siteName}`} target="_blank" className="text-blue-600 px-1">{user?.siteName}</Link>
                        </p>
                    </div>
                    {
                        loadingUserApps ? <LoadingIndicator />
                            : <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-24">
                                {
                                    userApps.map((item: APP_INFO) => <div
                                        key={item.title}
                                        className="cursor-pointer">
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
                <div className="my-6 flex">
                    <LinkButton
                        title={"Install more apps"}
                        href={`/apps`}
                        showNextIcon
                    />
                </div>
            </section>
        </div>
    </div>
}