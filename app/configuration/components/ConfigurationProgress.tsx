'use client'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import Link from 'next/link'


interface PROPS {
    status: string,
    progress: number,
    domainName: string,
    failed: boolean,
    succeed: boolean
}

export default function ConfigurationProgress({
    status = "notStarted",
    progress = 0,
    failed = false,
    succeed = false,
    domainName
}: PROPS) {
    const [open, setOpen] = useState(true)
    const router = useRouter()

    return (
        <Dialog open={open} onClose={() => { }} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-white0/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="border border-gray-200 bg-gray-50 relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-10">
                                    <ArrowPathIcon aria-hidden="true" className="size-6 text-green-600" />
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                        Configuring your SaaS
                                    </DialogTitle>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Please wait while we complete the SaaS configuration process. The configuration process will take about 1 - 3 mintues based on your internet speed. Avoid closing or refreshing this page.
                                        </p>
                                    </div>
                                    <div className='py-5'>
                                        <span className="text-green-600 text-sm font-medium">{status} </span>
                                        <div className="flex justify-between items-center space-x-3">
                                            <div className="w-full bg-gray-200 rounded-full">
                                                <div
                                                    className={`flex justify-center bg-green-600  text-xs font-medium text-blue-100 p-0.5 leading-none rounded-full`}
                                                    style={{ width: `${progress + 1}%` }}
                                                >
                                                </div>
                                            </div>
                                            <p className="w-16 text-sm text-gray-900">{progress + 1} %</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {(failed || succeed) && <div className="bg-white px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            {succeed && <Link
                                onClick={() => {
                                    setOpen(false)
                                }}
                                href={`/configuration/${domainName}`}
                                target='_blank'
                                className="inline-flex w-full justify-center rounded-md bg-[#1677FF] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Continue
                            </Link>}
                            {failed && <button
                                disabled={failed}
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white sm:mt-0 sm:w-auto"
                            >
                                Cancel
                            </button>}
                        </div>}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
