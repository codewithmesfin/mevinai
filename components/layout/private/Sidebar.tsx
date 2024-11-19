import { Brand, SidebarItem } from '@/components'
import React from 'react'


export default function Sidebar() {

    return (
        <div className={`fixed hidden bg-gray-100 border-r h-screen md:flex flex-col flex-none overflow-auto w-[230px]  group lg:max-w-sm transition-all duration-300 ease-in-out`}>
            <div className="p-4">
                <div
                    className="w-16 h-16 relative flex items-center flex-shrink-0"
                >
                    <Brand />
                </div>
            </div>
            <SidebarItem />
        </div>
    )
}