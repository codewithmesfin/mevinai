import { CheckIcon } from "@heroicons/react/24/outline";
import LoadingIndicator from "../LoadingIndicator";
import RequiredLabel from "@/app/user/components/requiredLabel";




interface PROPS {
    placeholder?: string;
    label?: any;
    value?: string;
    type?: string;
    error?: string;
    success?: string;
    loading: boolean,
    available?: boolean,
    isTextArea?: boolean;
    rows?: number;
    onChange?: any;
    onInput?: any;
    onKeyDown?: any
    isPasswordField?: boolean
    showPassword?: boolean
    onShowPassword?: any
    autoComplete?: string
    isRequired?: boolean,
    domainName: string,
    disabled?: boolean

}

export default function DomainNameField({
    label,
    placeholder,
    type, value,
    error,
    available = false,
    onChange,
    onInput,
    autoComplete = "off",
    isRequired = false,
    domainName,
    loading,
    disabled = false
}: PROPS) {
    return <div>
        <label htmlFor={type} className="block text-sm text-gray-700">
            {label} {isRequired && <RequiredLabel />}
        </label>
        <div className="mt-2 ">
            <div className={`border  ${error ? 'border-red-600' : 'border-gray-200'} rounded-xl px-4 flex items-center space-x-3 md:space-x-3`}>
                <p className="text-gray-600 italic1">https://</p>
                <input
                    disabled={disabled}
                    type={type}
                    required={isRequired}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e: any) => onInput(e.target.value)}
                    onBlur={(e: any) => onChange(e.target.value)}
                    className={`py-2 h-10  w-full text-gray-700
                            focus:ring-0 focus:outline-none placeholder:text-gray-400 text-sm
                        `}
                />
                <div className="flex items-center space-x-1">
                    {loading && <LoadingIndicator />}
                    {available && <span className="text-green-600"><CheckIcon className="h-5 w-5" /></span>}
                    <p className="text-gray-600 italic1">.mevinai.com</p>
                </div>
            </div>

        </div>
        <div>
            {error != "" && <small className="text-red-600 italic">{error}</small>}
        </div>
        <div>
            {available && <small className="text-green-600 font-medium italic">Congratulations, {domainName} available.</small>}
        </div>
    </div>
}