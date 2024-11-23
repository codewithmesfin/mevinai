'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowPathIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { APP_INFO } from '@/types/app'
import LoadingIndicator from '@/components/LoadingIndicator'
import api from '@/lib/api'
import show from '@/lib/toast'


interface PROPS {
    open: boolean,
    app: APP_INFO | undefined,
    toggleModal: (buttonName:string) => void,
    siteName: string
}

export default function AppDetail({
    open,
    app,
    toggleModal,
    siteName
}: PROPS) {

    const installed = app?.alreadyInstalled
    const [loading, setLoading] = useState<boolean>(false)

    const installOrInstallApp = () => {
        setLoading(true)

        const payload = {
            "siteName": siteName,
            "app": app?.appName
        }
        api.create(payload, installed?"/uninstall-app": "/install-app")
            .then(() => {
                show.success(`${app?.title} has been ${installed ? 'uninstalled' : "installed"} successfully.`)
                 })
            .catch(() => {
                show.error(`Unable to install ${app?.title} to site ${siteName} right now. Try again.`)
            })
            .finally(() => {
                setLoading(false)
                toggleModal("installUninstall")
            });
    }
  

    return (
        <Dialog open={open} onClose={() => { }} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="border border-gray-200 bg-gray-50 relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-16">
                                    <img src={app?.image} alt=""
                                        className='object-contain rounded max-h-16 max-w-16'
                                    />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        {app?.title}
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {app?.subtitle}
                                        </p>
                                    </div>
                                    <div className='py-2'>
                                        <Link href={`${app?.href}`}
                                            target='_blank'
                                            className="text-blue-600 text-sm flex justify-center md:justify-start items-center space-x-4"
                                        >
                                            <span>Learn more</span>
                                            <ArrowRightIcon className="w-4 h-4" />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="bg-white px-4 py-3 sm:px-6">
                            {loading ?
                                <div className='flex items-center space-x-3'>
                                    <LoadingIndicator />
                                    <span className='text-gray-600'>{installed ? 'Uninstalling' : "Installing"} {app?.title} ... </span>
                                </div>
                                : <div className='sm:flex sm:flex-row-reverse'>
                                   {app?.appName!="erpnext"&& <button
                                        onClick={installOrInstallApp}
                                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                    >
                                        {installed ? 'Uninstall' : 'Install'}
                                    </button>}
                                    <button
                                        data-autofocus
                                        onClick={() => {
                                            toggleModal("cancel")
                                        }}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>
                                </div>}
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
