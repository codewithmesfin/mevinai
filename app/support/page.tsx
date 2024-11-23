import { LinkButton } from "@/components";
import NotFound from "../not-found";
import Link from "next/link";
import { socials } from "@/data/aboutus";


export default function Support() {
    const companyInfo = [
        {
            title: "Phone Number",
            values: ["+251 91 152 2902", "+251 91 580 2674"],
            stratWith: "tel:"
        },
        {
            title: "Email",
            values: ["mesfin@mevinai.com", "sintayehu@mevinai.com"],
            stratWith: "mailto:"
        },
    ]
    return <div className='mx-auto max-w-[90%]'>
        <div className="py-24 md:py-32">
            <section>
                <div className='mx-auto md:max-w-[90%] py-6'>
                    <div className='py-4 mx-auto w-[90%] md:max-w-4xl'>
                        <h1 className={`text-gray-600 text-center text-3xl md:text-6xl font-bold`}>
                            How<span className='text-[#1677FF]'> Mevinai</span> helps
                        </h1>
                        <p className={`text-gray-700 text-sm md:text-3xl text-center py-3`}>
                            Book a 30 minutue quick meeting on {"Mevinai's"} Calender, discuss your topic(s) and decide your next action plans.
                        </p>
                    </div>
                    <div className='mx-auto max-w-[95%] md:py-6'>
                        <div className="md:flex items-center md:space-x-10">
                            <div className="w-full md:w-1/2">
                                <h2 className={`text-gray-900 font-medium text-xl md:text-4xl md:py-3`}>
                                    Set up your first meeting
                                </h2>
                                <p className={`text-gray-600 text-sm md:text-xl py-3`}>
                                    Ready to meet with a team at Mevinai? Click the button below to access his
                                    Calendly and choose a time that works best for you.<br />
                                    Once {"you've"} selected a date and time, {"you'll"} be all set for your meeting.
                                </p>
                                <div className="pt-3 flex">
                                    <LinkButton
                                        href="https://calendly.com/mesfin-tsegaye/meet-mevinai"
                                        title="Book a meeting"
                                        showNextIcon
                                        openOnOtherTab
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mt-10 md:mt-1">
                                <img src="/images/calendly.png"
                                    alt=""
                                    className='w-full h-full md:shadow rounded'
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <div className="w-[90%] mx-auto py-16">
                    <div>
                        <h1
                            style={{ lineHeight: 1.2 }}
                            className="text-gray-900 text-2xl md:text-5xl font-bold text-center">
                            Our team is
                            <span
                                className='px-2 italic font-extrabold text-3xl md:text-6xl italic1 bg-gradient-to-r from-[#ff4533] to-green-500 inline-block text-transparent bg-clip-text font-extrabold'>
                                {"actively "}
                            </span>
                        </h1>
                        <p className={`text-gray-700 text-center text-xl md:text-3xl py-3`}>
                            available for phone call and email for your convenience
                        </p>
                    </div>
                    <div className="py-4">
                        <div className="md:flex justify-center items-center md:space-x-10">
                            {
                                companyInfo.map((item: any, index: number) => <div key={item.title}>
                                    <h1 className="text-gray-700 font-semibold md:text-lg py-2">{item.title}</h1>
                                    {item.values.map((value: string) => <div key={value} className="py-1">
                                        <Link href={`${item.stratWith}${value}`} className="text-blue-600">{value} </Link>
                                    </div>)}
                                </div>)
                            }
                        </div>
                    </div>
                    <div className="py-10">
                        <div className="md:flex items-center md:space-x-20">
                            <div className="w-full md:w-2/5">
                                <div className="py-1 text-4xl text-gray-800">
                                    🔍
                                </div>
                                <h1
                                    style={{ lineHeight: 1.2 }}
                                    className="text-gray-900 text-3xl md:text-5xl font-bold">
                                    We are
                                    <span
                                        className='px-2 italic font-extrabold text-4xl md:text-6xl italic1 bg-gradient-to-r from-[#ff4533] to-green-500 inline-block text-transparent bg-clip-text font-extrabold'>
                                        {"active "}
                                    </span>
                                    on Social Medias
                                </h1>
                                <div>
                                    <p className="text-gray-700 md:text-lg py-1">
                                        Our customers are reaching out us via different social media
                                        platforms. Follow us for a better
                                        expereince.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-3/5 pt-16 md:pt-1">
                                <div className='grid grid-cols-3 gap-4 md:gap-5'>
                                    {
                                        socials.map((item, i) => <Link key={item.title}
                                            href={item.href}
                                            target="_blank"
                                        >
                                            <div className="text-gray-800 hover:text-blue-600">
                                                <div className="py-2 flex justify-center text-4xl">
                                                    <img src={item.icon} alt=""
                                                        className="h-8 w-8 rounded-full"
                                                    />
                                                </div>
                                                <h1 className='text-center text-sm md:text-lg'>{item.title}</h1>
                                            </div>
                                        </Link>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
}