'use client'

import { Button } from "@/components"
import api from "@/lib/api"
import show from "@/lib/toast"
import { SITE, USER } from "@/types/user"
import { ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface PROPS {
    site?: SITE,
    user?: USER
}
export default function SiteInfo({ site, user }: PROPS) {
    const configuration = {
        saas: (site?.status == "site created") && (site!.nginx && site!.nginx!.status == "active") && (site!.ssl && site!.ssl!.status == "active"),
        site: site?.status == "site created",
        nginx: site?.nginx && site!.nginx!.status == "active",
        ssl: site?.ssl && site!.ssl!.status == "active"
    }

    const [installing, setInstalling] = useState(false)
    const router = useRouter()
    const createSite = () => {
        setInstalling(true)
        const payload = {
            "name": user?.firstName,
            "email": user?.email,
            "siteName": user?.siteName,
            "ownerId": user?._id,
            "status": "site created",
            "quota": {
                "ram": "2GB",
                "cpu": "2 cores",
                "storage": "20GB",
                "bandwidth": "100GB"
            }
        }
        api.create(payload, "/create-site")
            .then(() => {
                setInstalling(false)
                show.success(`Dear ${user?.firstName}, your Frappe site ${user?.siteName} has been configured successfully.`)
                router.push("/configuration")
            })
            .catch(() => {
                setInstalling(false)
                show.error(`Unable to create site ${user?.siteName} right now. Try again.`)
            })
    }

    return <div className="border border-gray-200 rounded-xl p-5 md:p-6">
        {configuration.site ? <div className="flex  space-x-3">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                <CheckBadgeIcon aria-hidden="true" className="size-6 text-green-600" />
            </div>
            <div>
                <h2 className="text-base font-semibold text-gray-900">
                   Frappe Site Created.
                </h2>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Your Software as a Service, {user?.siteName} has been configured successfully.
                        <Link href={`http://${user?.siteName}`}
                        target="_blank"
                        className="text-blue-600 title1 italic border-b border-blue-500"
                        >View your SaaS</Link>
                    </p>
                </div>
            </div>
        </div>
            : <div className="flex  space-x-3">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-red-700">
                        Frappe Site Not Created
                    </h2>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Dear {user?.firstName}, we are unable to configure your Software as a Service, {user?.siteName} this time. Please try again.
                            </p>
                            <div className="py-3 max-w-[150px]">
                            <Button title={"Try again"} py="py-1.5"
                                isLoading={installing} onclick={createSite}
                                showNextIcon
                                disabled={installing}
                                bgColor={installing ? 'bg-gray-400' : 'bg-[#1677FF]'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}