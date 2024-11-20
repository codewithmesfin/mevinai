import { steps } from "@/data";
import Image from "next/image";
import LinkButton from "../button/LinkButton";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Steps() {
    return <div>
        <div className="w-[90%] mx-auto my-3 bg-gray-50">
            <div className="py-3 w-full md:max-w-4xl mx-auto">
                <h1 className="text-gray-900 text-center text-3xl md:text-6xl font-semibold">
                    <span className="text-[#1677FF] md:pr-2">3 simple steps</span>
                    to setup your SaaS automatically
                </h1>
                <p className="text-center md:text-xl text-gray-600 py-3">
                    We make it easy to secure accommodation and even easier for guests to pick and pay for rooms
                </p>
                <div className='py-6 w-full md:max-w-[240px] mx-auto'>
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
            <div className="md:flex items-center justify-center md:space-x-10">
                <div className="w-full md:w-2/5">
                    <div className="py-6">
                        <h1 className="text-gray-700">
                            Deploying ERPNext and other Frappe apps with Mevinai is a seamless process.
                            {"There's"} no need for software engineers or DevOps professionals—just get started
                            and launch your ERPNext SaaS in under two minutes!
                        </h1>
                        <div className="py-3">
                            {
                                steps.map((item, index) => <div key={item.title}>
                                    <div className="flex space-x-2 py-3">
                                        <div className="text-lg md:text-xl">{index+1}.</div>
                                        <div>
                                            <h1 className="text-gray-800 font-semibold">
                                                {item.title}
                                            </h1>
                                            <p className="text-gray-700 py-1">
                                                {item.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-2/5">
                    <Image alt="mevinai"
                        src={"/images/img1.png"}
                        height={600} width={600}
                        className="h-full w-full object-contain"
                    />
                </div>
            </div>
        </div>
    </div>
}