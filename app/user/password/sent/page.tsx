import { LinkButton } from "@/components";
import {ArrowLeftIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";

export default function PasswordEmailSent() {
    return (<div className='flex space-x-4 justify-center items-center h-screen'>
        <div className="w-[90%] md:max-w-3xl mx-auto">
            <div className="flex justify-center py-6">
            <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-16">
                <InboxArrowDownIcon aria-hidden="true" className="size-10 text-green-600" />
            </div>
            </div>
            <h1 className="text-lg md:text-xl text-gray-600 text-center">
                Dear Customer, we sent a verification code to your email. 
                Please check your email and follow the instruction to reset
                your password.
                </h1>
                <div className="w-[80%] md:max-w-[180px] mx-auto my-6">
                    <LinkButton title={"Go to home"} href={"/"} 
                    leftIcon={<ArrowLeftIcon aria-hidden="true" className="size-5 text-white" /> }
                    />
                </div>
        </div>
    </div>)
}