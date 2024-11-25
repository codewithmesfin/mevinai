import { steps } from "@/data";
import Image from "next/image";
import LinkButton from "../button/LinkButton";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Steps() {
    return <div>
        <div className="w-[90%] mx-auto my-3 bg-white">
            <div className="py-3 w-full md:max-w-4xl mx-auto">
                <h1 className="text-gray-900 text-center text-3xl md:text-6xl font-semibold">
                    <span className="text-[#1677FF] pr-1 md:pr-2">3 simple steps</span>
                    to setup your SaaS automatically
                </h1>
                <p className="text-center md:text-lg text-gray-600 py-3">
                    At Mevinai, launching an ERPNext-based SaaS is effortless. With just one click and a wait time of no more than 2 minutes, your entire setup is ready to go.
                </p>
                <div className='py-6 mx-auto'>
                    <div className="flex justify-center">
                        <LinkButton
                            title="Get started now"
                            leftIcon={
                                <ArrowPathIcon path="right"
                                    className="h-5 w-5"
                                    strokeWidth={2}
                                />
                            }
                            href={"/user/signup"}
                            py="py-3"
                            showNextIcon
                        />
                    </div>
                </div>
            </div>
            <div className="w-full md:max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
                    {
                        steps.map((item, index) => <div key={item.title}>
                            <div className="flex items-center space-x-2 py-3 h-full rounded-xl bg-gray-50 border border-gray-100 p-5 ">
                                <div>
                                    <h1 className="font-medium text-blue-600">Step {index + 1}</h1>
                                    <h1 className="text-gray-800 pt-1 font-semibold text-lg md:text-xl">
                                        {item.title}
                                    </h1>
                                    <p className="text-gray-600 py-1">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </div>
}