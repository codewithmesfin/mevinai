import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface PROPS {
    title: string,
    showNextIcon?: boolean,
    bgColor?: string,
    textColor?: string,
    href: string
    borderColor?: string,
    leftIcon?: any,
    py?: string,
    openOnOtherTab?:boolean
}

export default function LinkButton({
    title = "Continue",
    showNextIcon = false,
    bgColor = "bg-[#1677FF]",
    textColor = "text-white",
    href,
    borderColor = 'border-[#1677FF]',
    leftIcon,
    py = "py-2",
    openOnOtherTab=false
}: PROPS) {
    return <Link
        href={href}
        target={openOnOtherTab?'_blank':'_self'}
        className={`w-full ${bgColor} ${borderColor} ${textColor} ${py} flex justify-center md:justify-evenly items-center space-x-2 rounded-xl border hover:border-green-500 hover:bg-green-500 hover:text-white px-4`}
    >
        {leftIcon}
        <span>{title}</span>
        {showNextIcon && <ArrowLongRightIcon path="right" className="h-4 w-4" strokeWidth={2} />}
    </Link>
}