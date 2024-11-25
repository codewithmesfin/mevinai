import { reasons } from "@/data";
import LinkButton from "../button/LinkButton";
import { AdjustmentsHorizontalIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import OutlineLink from "../button/OutlineLink";



export default function Reasons() {
    return <div className="w-[90%] mx-auto my-3 bg-white">
        <div className="py-24">
            <div className="py-2">
                <h1 className="text-gray-900 md:text-center text-4xl md:text-6xl font-semibold">
                    Why Mevinai 
                </h1>
                <div className="w-full md:max-w-4xl mx-auto">
                <p className="text-center md:text-lg text-gray-600 py-3">
                {"We’re"} on a mission to help you connect to opportunity and positively impact business. 
                {"We'll"} be sharing stories, insights, and resources to help you make the most of 
                your work and make a difference in the world. {"We're"} excited to get started, and we 
                hope you are too. {"Let's"} make a difference, together.
                </p>
                </div>
            </div>
            <div className="md:py-4">
                <div className="md:flex justify-center md:space-x-6">
                    {
                        reasons.map((item, index) => <div key={item.title} 
                        className="w-full rounded-xl border md:border-none p-4 md:p-0 my-4 md:my-0">
                            <div className="p-3 md:p-5">
                                <div className="text-2xl">
                                    {item.icon}
                                </div>
                                <h1 className="md:text-lg text-black font-bold">
                                    {item.title}
                                </h1>
                                <p className="text-gray-600 py-1">
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>)
                    }
                </div>
                <div className="sm:flex justify-center items-center sm:space-x-2 md:space-x-10">
                    <div className='py-3'>
                        <LinkButton
                            title="Luanch your SaaS now"
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
                    <div className='py-3'>
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
    </div>
}