import { ArrowRightIcon } from "@heroicons/react/24/outline";
import LoadingIndicator from "../LoadingIndicator";

interface PROPS {
    title: string,
    isLoading: boolean,
    showNextIcon?: boolean,
    bgColor?: string,
    textColor?: string,
    disabled?: boolean,
    onclick: () => void,
    leftIcon?: any
    py?: string
    px?: string
}

export default function Button({
    title = "Continue",
    isLoading = false,
    showNextIcon = false,
    bgColor = "bg-[#1677FF]",
    textColor = "text-white",
    disabled = false,
    leftIcon,
    onclick,
    py = "py-2.5",
    px = "px-3 sm:px-6"
}: PROPS) {
    return <button
        disabled={disabled}
        onClick={onclick}
        className={`${py} ${px} rounded-xl ${bgColor} ${textColor} flex justify-center items-center spaxe-x-3 hover:bg-green-600`}
    >{isLoading && <LoadingIndicator />}
        {leftIcon}
        <span className={`${textColor} px-3`}>{title}</span>
        {showNextIcon && <ArrowRightIcon path="right" className="h-4 w-4" strokeWidth={2} />}
    </button>
}