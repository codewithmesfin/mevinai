
import { LinkButton } from "@/components";
import { features } from "@/data";
import { socials, values } from "@/data/aboutus";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";


export default function About() {
    return (
        <>
            <section
                className="bg-white flex items-center">
                <div className="w-[95%] md:w-[95%] mx-auto pt-32 md:pt-48 pb-10">
                    <div className="md:flex md:space-x-10 justify-evenly items-center">
                        <div className="w-full md:w-2/5">
                            <h1 className="py-2 text-blue-900 flex space-x-2 items-center">
                                <span className="text-[#ff4533]"><UserGroupIcon className="w-6 h-6 " /></span>
                                <span>We are your family</span>
                            </h1>
                            <div className="py-4">
                                <h1
                                    style={{ lineHeight: 1.2 }}
                                    className="text-gray-900 text-3xl md:text-5xl font-bold">
                                    Mevinai can transform ideas in to realiy.
                                </h1>
                            </div>
                            <div className="py-4 flex justify-start">
                            <LinkButton 
                                title={"Meet the team"} 
                                 href="https://calendly.com/mesfin-tsegaye/meet-mevinai"
                                 openOnOtherTab
                                 showNextIcon
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-2/5 pt-10 md:pt-1">
                            <Image src="/images/about/1.png" alt="abou1"
                                className="w-full h-full"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-16">
                <div className="w-[90%] mx-auto ">
                    <div className="py-3">
                        <h1 className="text-blue-600 text-center font-bold text-2xl md:text-3xl">
                            About us
                        </h1> <div className="w-full md:max-w-4xl mx-auto py-4">
                            <h1
                                style={{ lineHeight: 1.2 }}
                                className="text-gray-900 text-3xl text-center md:text-7xl font-bold">
                                We are a small team of professional engineers. We are growing.
                            </h1>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="w-full md:max-w-4xl mx-auto">
                            <p className="text-gray-700 font-medium text-center md:text-xl py-2">
                                After a years of working in some of the highest
                                tech industries in the world, we come to realize
                                that our technical know-how, experience, and our
                                African value can be put together to create technologies
                                that will transform lives in Africa.
                            </p>
                            <p className="text-gray-700 font-medium text-center md:text-xl py-2">
                                As our first step in this grand journey, we are engineering the
                                rails on which technology innovation moves because we believe a
                                reliable, secure, and decentralized system will act as a catalyst
                                to unlock business opportunities everywhere.
                            </p>
                        </div>
                        <div className="w-full pt-16">
                            <Image src="/images/about/2.png" alt="abou1"
                                className="w-full h-full rounded-xl"
                                width={500}
                                height={500}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="w-[90%] md:max-w-4xl mx-auto py-4 md:py-16">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10'>
                        {
                            features.map((item, i) => <div key={item.title}
                            >
                                <div >
                                    <div className="py-2 text-2xl md:text-4xl">
                                        {item.icon}
                                    </div>
                                    <h1 className='text-gray-900 text-xl'>{item.title}</h1>
                                    <p className="text-gray-600 py-1">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </section>


            <section className="py-10 md:py-16">
                <div className="w-[90%] mx-auto ">
                    <div className="w-full md:py-16">
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


            <section className="py-16">
                <div className="w-[90%] md:w-[85%] mx-auto ">
                    <div className="py-3">
                        <h1 className="text-blue-600 text-center font-bold text-2xl md:text-3xl">
                            CORE VALUES
                        </h1>
                        <h1
                            style={{ lineHeight: 1.2 }}
                            className="py-4 text-4xl text-center md:text-8xl font-extrabold text-gray-900">
                            We stand for
                        </h1>
                    </div>
                    <div className="w-full py-6 md:py-16">
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            {
                                values.map((item, i) => <div key={item.title}
                                >
                                    <div className='border border-gray-200 rounded-xl p-5'>

                                        <div className="py-2 text-center text-4xl">
                                            {item.icon}
                                        </div>
                                        <h1 className='text-gray-700 text-center text-xl md:text-2xl'>{item.title}</h1>
                                        <p className="text-gray-600 text-center py-3">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>)
                            }
                        </div>

                    </div>
                </div>
            </section>

        </>
    );
}