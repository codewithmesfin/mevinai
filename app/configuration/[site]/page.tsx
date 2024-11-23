"use client"

import { LinkButton } from "@/components";
import { ClipboardDocumentIcon } from "@heroicons/react/16/solid";
import { AtSymbolIcon, CheckBadgeIcon, ClipboardIcon, EyeIcon, EyeSlashIcon, LinkIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";



export default function ConfigSucceed() {
    const [showPassword, setPasswordVisible] = useState<boolean>(false)
    const [showUsername, setUsernameVisible] = useState<boolean>(false)
    const [isCopied, setIsCopied] = useState(false);
    const [copiedText, setCopiedText] = useState("");



    const copyToClipboard = async (text: string) => {
        setCopiedText(text)
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    const { site } = useParams()
    return <div className='py-3 sm:py-32'>
        <div className="w-[90%] sm:max-w-[500px] mx-auto">
            <div className="md:flex justify-center py-6">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-16">
                    <CheckBadgeIcon  className="size-10 sm:size-12 text-green-600" />
                </div>
            </div>
            <h1
                style={{ lineHeight: 1.2 }}
                className="text-4xl md:text-6xl font-extrabold text-gray-600 text-center">
                Congratulations
            </h1>
            <div className="py-6">
                <p className="text-green-600 text-center">Your SaaS setup is complete!</p>
                <p className="text-gray-600 text-center py-2">
                    We’ve sent your temporary ERPNext login credentials (username and password)
                    to your email. For convenience, you can also find them below.
                    These credentials are valid only for your first login unless you change them.
                </p>
                <p className="text-gray-600 text-center">
                    <strong>Important:</strong> We recommend updating your password immediately after
                    your first successful login to ensure security.
                </p>

                <div className="py-3">
                    <p className="text-gray-900 font-semibold py-2">
                        Use the link below to access your ERPNext instance:
                    </p>
                    <div className="py-3">
                        <div className="py-2">
                            <div className="flex space-x-2 items-center">
                                <Link href={`http://${site}`} target="_blank" className="flex space-x-2 items-center">
                                    <LinkIcon aria-hidden="true" className="size-5 text-gray-600" />
                                    <p>SaaS Link: <span className="italic text-blue-600">https://{site}</span> </p>
                                </Link>
                                <div className="pl-2 sm:pl-4">
                                    <button
                                        onClick={() => copyToClipboard(`http://${site}`)}
                                        className="flex items-center space-x-1 rounded-full border border-gray-200 bg-gray-50 py-1 px-2 cursor-pointer">
                                        <ClipboardDocumentIcon className="size-3 text-gray-900" />
                                        <span className="text-sm text-gray-600 font-bold"> Copy</span>
                                    </button>
                                </div>
                                {isCopied && copiedText == `http://${site}` && <p className="text-gray-700 text-sm italic">Copied</p>}
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="flex space-x-2 items-center">
                                <AtSymbolIcon aria-hidden="true" className="size-5 text-gray-600" />
                                <p>User Name: <span className="text-gray-500">{showUsername ? 'Administrator' : "*******"} </span> </p>
                                <button onClick={() => setUsernameVisible(!showUsername)}
                                    className="text-gray-900 px-2 md:px-4"
                                >
                                    {showUsername ? <EyeIcon
                                        className="size-6"
                                    /> : <EyeSlashIcon
                                        className="size-6"
                                    />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(`Administrator`)}
                                    className="flex items-center space-x-1 rounded-full border border-gray-200 bg-gray-50 py-1 px-2 cursor-pointer">
                                    <ClipboardDocumentIcon className="size-3 text-gray-900" />
                                    <span className="text-sm text-gray-600 font-bold"> Copy</span>
                                </button>
                                {isCopied && copiedText == "Administrator" && <p className="text-gray-700 text-sm italic">Copied</p>}
                            </div>
                        </div>
                        <div className="py-2">
                            <div className="flex space-x-2 items-center">
                                <ShieldCheckIcon aria-hidden="true" className="size-5 text-gray-600" />
                                <p>Password: <span className="text-gray-500">{showPassword ? "admin" : "*******"} </span> </p>
                                <button onClick={() => setPasswordVisible(!showPassword)}
                                    className="text-gray-900 px-2 md:px-4"
                                >
                                    {showPassword ? <EyeIcon
                                        className="size-6"
                                    /> : <EyeSlashIcon
                                        className="size-6"
                                    />}
                                </button>
                                <button
                                    onClick={() => copyToClipboard(`admin`)}
                                    className="flex items-center space-x-1 rounded-full border border-gray-200 bg-gray-50 py-1 px-2 cursor-pointer">
                                    <ClipboardDocumentIcon className="size-3 text-gray-900" />
                                    <span className="text-sm text-gray-600 font-bold"> Copy</span>
                                </button>
                                {isCopied && copiedText == "admin" && <p className="text-gray-700 text-sm italic">Copied</p>}
                            </div>
                        </div>
                    </div>
                    <div className="py-1">
                        <p className="text-gray-600 py-2">
                            Welcome aboard, and enjoy your ERPNext experience!
                        </p>
                        <div className="py-3 flex">
                            <LinkButton title={"Go to your SaaS"} href={`http://${site}`} showNextIcon openOnOtherTab />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}