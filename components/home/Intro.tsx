import { AdjustmentsHorizontalIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { Brand, LinkButton, OutlineLink } from '@/components'



export default function Intro() {
    return <>
        <div className="bg-white">
            <div className="w-[90%] md:max-w-4xl mx-auto pt-32">
                <div className="flex justify-center items-center space-x-3 py-6">
                    <div className='rounded-full bg-[#e9f4ff] text-blue-500 py-3 px-10'>
                        <h1>All in one Software as a Service</h1>
                    </div>
                </div>
                <div className="py-4 md:py-2">
                    <h1
                        style={{ lineHeight: 1.3 }}
                        className="text-3xl md:text-6xl text-center text-gray-800 font-extrabold">
                        Configure your own
                        <span
                            className='bg-gradient-to-r from-green-600 via-[#1677FF] to-green-600 inline-block text-transparent bg-clip-text font-extrabold'>
                            {"ERPNext SaaS "}
                        </span> in 2 minutes
                    </h1>
                    <div className="pt-2 md:py-4 mx-auto md:max-w-3xl">
                        <p className="text-gray-700 text-center">
                            Discover the ultimate all-in-one solution {"you've"} been searching for!
                            Simple, powerful, and budget-friendly Solution – ERPNext.
                            Go live today with the {"world’s"} #1 free and open-source enterprise
                            software solution.
                        </p>
                    </div>
                </div>
                <div className="sm:flex justify-center items-center sm:space-x-2 md:space-x-10">
                    <div className='py-3 w-full md:max-w-[210px]'>
                        <LinkButton
                            title="Get started for free"
                            leftIcon={
                                <ArrowPathIcon path="right"
                                    className="h-5 w-5"
                                    strokeWidth={2}
                                />
                            }
                            href={"/user/signup"}
                            py="py-3"
                        />
                    </div>
                    <div className='py-3 w-full md:max-w-[220px]'>
                        <OutlineLink href="/marketplace" title={"Explore marketplace"}
                            py="py-3"
                            leftIcon={
                                <AdjustmentsHorizontalIcon
                                    path="right"
                                    className="h-5 w-5"
                                    strokeWidth={2}
                                />}
                        />
                    </div>
                </div>
            </div>
        </div>
    </>
}