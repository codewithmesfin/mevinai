"use client"

import { AdjustmentsHorizontalIcon, Bars3BottomLeftIcon, Cog8ToothIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import SidebarItem from "./SidebarItem";
import { PrivateBrand } from "@/components";
import Link from "next/link";




export default function SMPrivateNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return <div className="fixed z-10 w-full border-b bg-white md:hidden">
        <nav className='w-[95%] mx-auto px-2 py-3 md:py-6 flex flex justify-between items-center'>
            <div className="flex items-center space-x-10">
                <button
                    type="button"
                    className="-m-2.5 lg:hidden inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Bars3BottomLeftIcon aria-hidden="true" className="size-6" />
                </button>
                <PrivateBrand />
            </div>
            <div className="flex items-center space-x-6">
                <Link href={"/configuration"}>
                    <InformationCircleIcon aria-hidden="true" className="size-6 text-gray-700" />
                </Link>
                <Link href={"/apps"}>
                    <AdjustmentsHorizontalIcon aria-hidden="true" className="size-6 text-gray-700" />
                </Link>
                <Link href={"/settings"}>
                    <Cog8ToothIcon aria-hidden="true" className="size-6 text-gray-700" />
                </Link>
            </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <div className="fixed w-full inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                    <PrivateBrand />
                    <button
                        type="button"
                        className="-m-2.5 rounded-md p-2.5 text-red-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-6 bg-white">
                    <div className="-my-6  divide-y divide-gray-500/10"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <SidebarItem
                        />
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </div>
}