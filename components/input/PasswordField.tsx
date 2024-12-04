"use client"

import RequiredLabel from "@/app/user/components/requiredLabel";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


interface PROPS {
    placeholder?: string;
    label?: any;
    value?: string;
    error?: string;
    success?: boolean;
    isTextArea?: boolean;
    rows?: number;
    onChange?: any;
    onKeyDown?: any
    autoComplete?: string
    isRequired?: boolean
}

export default function PasswordField({
    label,
    placeholder,
    value,
    error,
    onChange,
    autoComplete = "off",
    isRequired = false,
}: PROPS) {
    const [showPassword, setShowPassword] = useState(true)
    return <div>
        <label htmlFor='password' className="block text-sm text-gray-700">
            {label} {isRequired && <RequiredLabel />}
        </label>
        <div className="mt-2">
            <div className={
                `flex justify-between items-center
                 px-4 py-2 h-10 border rounded-xl  w-full 
                  placeholder:text-gray-400
                 ${error ? 'border-red-600' : 'border-gray-200 bg-white'} text-sm
                `
            }>
                <input
                    type={showPassword ? 'password' : 'text'}
                    required={isRequired}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: any) => onChange(e.target.value)}
                    className={`text-gray-700 focus:ring-0 focus:outline-none w-full`}
                />
                <button onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-700"
                    >
                    {showPassword ? <EyeIcon
                        className="h-5 w-5"
                    /> : <EyeSlashIcon
                        className="h-5 w-5"
                    />}
                </button>
            </div>

        </div>
        <div>
            <small className="text-red-600 italic">{error}</small>
        </div>
    </div>
}