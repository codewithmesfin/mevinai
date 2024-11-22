
"use client"

import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useRouter } from "next/navigation";
import { APP_INFO } from "@/types/app";
import { getApps } from "@/redux/slices/saasSlice";
import show from "@/lib/toast";
import { modules } from "@/data";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components";


export default function Marketplace() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();

    const [loadingApps, setLoadingApps] = useState<boolean>(false)


    const [apps, setApps] = useState<APP_INFO[]>([])


    useEffect(() => {
        setLoadingApps(true)
        getFrappeApps()
    }, [])



    const getFrappeApps = async () => {
        const result = await dispatch(getApps());
        if (result.type == 'saas/getApps/rejected')
            show.error("Unable to fetch Frappe apps from the marketplace at this time. Try again after a moment.")
        if (result.type == "saas/getApps/fulfilled" && result?.payload?.apps && result?.payload?.apps.length > 0) {
            const resultingApps = result?.payload.apps
            const filteredModules: any = modules.filter(module => resultingApps.includes(module.appName));
            setApps(filteredModules)
        }
        setLoadingApps(false)
    }




    return <div className="py-32 md:py-32">
        <div className="w-[90%] md:max-w-5xl mx-auto">
            <div>
                <h1 className="text-gray-700 font-extrabold text-center text-5xl md:text-6xl">Get Frappe apps for free</h1>
                <div className="py-6">
                    <p className="text-gray-600 text-center">
                        Enhance your Frappe site by easily finding and installing apps that fit your needs.
                    </p>
                </div>

                <div className="flex justify-center">
                    <LinkButton title={"Get started now"} href={"/user/login"} showNextIcon />
                </div>
            </div>
            <section className="py-8 md:py-10">
                {loadingApps ?
                    <div className='flex space-x-4 justify-center items-center h-full p-16'>
                        <LoadingIndicator />
                    </div>
                    : <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {
                            apps.map((item: APP_INFO) => <div
                                key={item.title}
                                onClick={() => {
                                    // setModalOpen(true)
                                    // setApp(item)
                                }}
                                className="bg-white border border-gray-200 cursor-pointer rounded-xl p-5">
                                <div className="pb-1">
                                    <img src={item.image} alt=""
                                        className="w-8 h-8 rounded"
                                    />
                                </div>
                                <div className="w-full">
                                    <h1 className="text-lg font-medium text-gray-900">{item.title} </h1>
                                    <p className="text-gray-600 text-sm">{item.subtitle} </p>
                                </div>
                                <div className='py-2'>
                                    <Link href={`${item?.href}`}
                                        target='_blank'
                                        className="text-blue-600 text-sm flex justify-start items-center space-x-4"
                                    >
                                        <span>Learn more</span>
                                        <ArrowRightIcon className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>)
                        }
                    </div>}
            </section>

        </div>
    </div>
}