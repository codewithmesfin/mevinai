
"use client"

import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { guides } from "@/data";


export default function UserGuide() {


    return <div className="py-16 md:py-32">
        <div className="w-[90%] md:max-w-5xl mx-auto">
            <div className='py-4 mx-auto w-[90%] md:max-w-4xl'>
                <h1 className={`text-gray-600 text-center text-4xl md:text-6xl font-bold pb-3`}>
                    <span className='text-[#1677FF]'>Mevinai</span> Guides
                </h1>
                <p className={`text-gray-600  md:text-lg text-center py-3`}>
                    Enhance your Frappe site by easily finding and installing apps that fit your needs.
                </p>
            </div>
            <section className="py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {
                        guides.map((item: any) => <div
                            key={item.title}
                            className={`bg-white border border-gray-200 rounded-xl p-5 md:p-10`}>
                            <div className="pb-1 text-4xl">{item.icon} </div>
                            <div className="w-full">
                                <h1 className="text-lg font-semibold text-gray-900">{item.title} </h1>
                                <p className="text-gray-600 py-2">{item.description} </p>
                            </div>
                            {item.href && <Link href={`${item?.href}`}
                                className="text-blue-600 text-sm flex justify-start items-center space-x-4"
                            >
                                <span>{item.linkTitle} </span>
                                <ArrowRightIcon className="w-4 h-4" />
                            </Link>}
                        </div>)
                    }
                </div>
            </section>

        </div>
    </div>
}