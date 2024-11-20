import { features } from "@/data";



export default function Features() {
    return <div className="my-1 md:my-16 py-8 md:py-16 bg-gray-50">
        <div className=" w-[90%] md:max-w-4xl mx-auto">
            <div className='md:flex md:justify-center md:space-x-10'>
                {
                    features.map((item: any, i) => <div key={item.title}
                        className="py-2 md:py-0 w-full h-full rounded-xl border md:border-none p-4 md:p-0 my-4 md:my-0"
                    >
                        <div className="h-full">
                            <div className="text-3xl">{item.icon}</div>
                            <h1 className="text-lg md:text-xl text-gray-900 font-bold">
                                {item.title}
                            </h1>
                            <p className="text-gray-600 py-2">
                                {item.subtitle}
                            </p>
                        </div>
                    </div>
                    )
                }
            </div>
        </div>
    </div>
}