"use client"

import { LinkButton, SwitchButton } from "@/components";
import NotFound from "../not-found";
import Link from "next/link";
import { socials } from "@/data/aboutus";
import { useState } from "react";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";


export default function Pricing() {

    const pricingOptions = [
        {
            title: "Basic",
            price: 600,
            color: 'text-green-600',
            bgColor: 'bg-green-600',
            items: [
                "For 6 users only, unlimited apps",
                "Ideal for too small businesses",
                "Functional training",
                "2GB RAM, 25GB SSD storage"
            ]
        },
        {
            title: "Standard",
            price: 1300,
            color: 'text-pink-600',
            bgColor: 'bg-pink-600',
            items: [
                "For 11 users only, unlimited apps",
                "Ideal for small businesses",
                "Free support",
                "Free upgrade",
                "Technical training",
                "Functional Training",
                "4GB RAM, 100GB SSD storage"
            ]
        },
        {
            title: "Custom",
            color: 'text-orange-600',
            bgColor: 'bg-orange-600',
            items: [
                "For unlimited users, unlimited apps",
                "Ideal for small businesses",
                "Free support",
                "Free upgrade",
                "Technical training",
                "Functional Training"
            ]
        },

    ]
    const [option, setOption] = useState({ yearly: false, pricing: pricingOptions })

    const updatePricing = (update: boolean) => {
        const oldPricingOptions = pricingOptions
        const factor = 1.25 // 25% more if monthly option is selected: value * 1.2
        if (update) {
            const newPricingOption = oldPricingOptions.map(x => {
                return {
                    ...x, price: x.price && x.price * factor
                }
            })
            setOption({ ...option, pricing: newPricingOption })
        }
        else setOption({ ...option, pricing: oldPricingOptions })
    }

    return <div className='mx-auto w-full max-w-[90%]'>
        <div className="py-24 md:py-32">
            <div className='mx-auto py-6'>
                <div className='py-4 mx-auto w-[90%] md:max-w-4xl'>
                    <h1 className={`text-gray-600 text-center text-3xl md:text-6xl font-bold pb-3`}>
                        <span className='text-[#1677FF]'>Usage-tiered</span> Pricing
                    </h1>
                    <p className={`text-gray-600  md:text-lg text-center py-3`}>
                        Harness the full potential of 100% open source while enjoying cost savings
                        with straightforward, compute-based pricing. Our transparent and predictable
                        model lets you track daily usage in real-time and pay only what you use
                        at the end of the month—no hidden surprises.
                    </p>
                </div>
                <div className="py-10 flex justify-center">
                    <SwitchButton
                        status={option.yearly}
                        rightTitle="Monthly"
                        leftTitle="Yearly"
                        onChange={(e: boolean) => {
                            setOption({ ...option, yearly: e })
                            updatePricing(e)
                        }}
                    />
                </div>
                <div className='md:py-6'>
                    <div>
                        <div className="md:flex justify-between md:space-x-5">
                            {
                                option.pricing.map((item: any, index: number) => <div key={item.title}
                                    className="my-6 md:my-0 w-full rounded-xl border border-gray-100 shadow-sm"
                                >
                                    <div className={`rounded-t-xl w-full h-2 ${item.bgColor}`}></div>
                                    <div className="p-5 md:p-6">
                                        <h1 className="text-xl md:text-3xl font-bold">{item.title} </h1>
                                        {item.price && <h2 className="text-gray-600 py-3">
                                            ETB
                                            <span className={`text-5xl md:text-7xl font-semibold ${item.color}`}>{item.price.toLocaleString()}</span>
                                        </h2>}
                                        <div className="py-3">
                                            {
                                                item.items.map((option: any) => <div key={option} className="flex items-center space-x-2">
                                                    <CheckBadgeIcon aria-hidden="true" className="size-4 text-blue-600" />
                                                    <p className="text-gray-600">{option} </p>
                                                </div>)
                                            }
                                        </div>
                                        <div className="py-4">
                                            <LinkButton
                                                title={"Get started"}
                                                href={"/user/signup"}
                                                py="py-3"
                                            />
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}