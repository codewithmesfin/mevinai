'use client'

import { Button } from "@/components"
import api from "@/lib/api"
import show from "@/lib/toast"
import { SITE, USER } from "@/types/user"
import { ArrowPathIcon, CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useState } from "react"


interface PROPS {
    site?: SITE,
    user?: USER
}
export default function NGINXInfo({ site, user }: PROPS) {
    const configuration = {
        saas: (site?.status == "site created") && (site!.nginx && site!.nginx!.status == "active") && (site!.ssl && site!.ssl!.status == "active"),
        site: site?.status == "site created",
        nginx: site?.nginx && site!.nginx!.status == "active",
        ssl: site?.ssl && site!.ssl!.status == "active"
    }

    const [installing, setInstalling] = useState(false)
    const router = useRouter()
    const configureNginx = () => {
        setInstalling(true)
        const payload = { siteName: user?.siteName, }
        api.create(payload, "/configure-nginx")
            .then(() => {
                setInstalling(false)
                show.success(`Dear ${user?.firstName}, NGINX has been configured to your site ${user?.siteName} successfully.`)
                router.push("/configuration")
            })
            .catch(() => {
                setInstalling(false)
                show.error(`Unable to configure nginx to domain name ${user?.siteName} right now. Try again.`)
            })
    }

    return <div className="border border-gray-200 rounded-xl p-5 md:p-6">
        {configuration.nginx ? <div className="flex  space-x-3">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                <CheckBadgeIcon aria-hidden="true" className="size-6 text-green-600" />
            </div>
            <div>
                <h2 className="text-base font-semibold text-gray-900">
                    Nginx Configured.
                </h2>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        NGINX Has Been Configured to your site {user?.siteName} to optimize web server performance and manage traffic efficiently.
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
                        SaaS Not Configured.
                    </h2>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Dear {user?.firstName}, we are unable to configure NGINX to your Software as a Service, {user?.siteName} this time. Please try again.
                        </p>
                        <div className="py-3 max-w-[150px]">
                            <Button title={"Try again"} py="py-1.5"
                                isLoading={installing} onclick={configureNginx}
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