'use client';

import { Brand, Button, DomainNameField, PasswordField, TextField } from "@/components";
import LoadingIndicator from "@/components/LoadingIndicator";
import validate from "@/lib/validator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "@/redux/store";
import { checkDomainNameExistance, checkEmailExistence } from "@/redux/slices/userSlice";
import { register } from "@/redux/slices/userSlice";
import show from "@/lib/toast";
import { ArrowRightIcon } from "@heroicons/react/24/outline";


export default function Signup() {
    const [online, setOnline] = useState(false)


    const [user, setUser] = useState<any>(null)
    const [subdomainName, setSubDomainName] = useState("")
    const [siteNameAvailable, setSiteNameAvailable] = useState<boolean>(false)
    const [checkingDomainName, setCheckingDomainName] = useState<boolean>(false)
    const [checkingEmail, setCheckingEmail] = useState<boolean>(false)
    const [formError, setFormError] = useState<any>(null)
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (typeof window !== 'undefined') setOnline(window.navigator.onLine)
    }, [online])

    useEffect(() => {
        validate.signupForm(formError)
    }, [formError])

    const { status } = useSelector((state: RootState) => state.user);
    const submit = async () => {
        if (!online) {
            show.error("You are currently offline. Please check your internet connection and try again.")
        }
        if (!user || (!user.firstName || !user.lastName || !user.email || !user.phone || !subdomainName || !user.password)) {
            show.error("Please fill all form fields with valid information!")
        }
        else {
            try {
                const result = await dispatch(register({
                    ...user,
                    siteName: `${subdomainName}.mevinai.com`,
                    "status": "active"
                }));
                if (result.type == "user/register/rejected")
                    show.error(`Unable to create your account. Try again.`)
                if (result.type == "user/register/fulfilled") {
                    show.success("Congratulation! Your account has been created successfully.")
                    router.push('/home');
                }
            } catch (err) {
                show.error(`Unable to create your account. Try again.`)
            }
        }
    }


    const checkIfEmailIsAvailable = async (email: string) => {
        if (online) {
            setCheckingEmail(true)
            if (email) {
                const result = await dispatch(checkEmailExistence(email));
                if (result.type == "user/checkEmailExistence/fulfilled") {
                    setFormError({ ...formError, email: result.payload?.inuse == true ? 'This email is already in use. Try with an other email.' : undefined });
                }
            }
            setCheckingEmail(false)
        }
        else {
            setFormError({ ...formError, email: 'Please check your internet connection and try again.' });
            show.error("You are currently offline. Please check your internet connection and try again.")
        }
    };


    const checkIfDomainIsAvailable = async (domainName: string) => {
        if (online) {
            setCheckingDomainName(true)
            if (domainName) {
                const result = await dispatch(checkDomainNameExistance(`${domainName}.mevinai.com`)); // Dispatch action to check if the email exists
                setSiteNameAvailable(result.payload?.available == true)
                if (result.payload?.available != true) {
                    setFormError({ ...formError, domainName: `${domainName}.mevinai.com is already taken. Try an other one.` });
                }
                setCheckingDomainName(false)
            }
        }
        else {
            setFormError({ ...formError, domainName: 'Please check your internet connection and try again.' });
            show.error("You are currently offline. Please check your internet connection and try again.")
        }
    }

    return (
        <div className="bg-gray-100 flex min-h-full flex-1 flex-col justify-center px-3 md:px-6 py-3 pb-24">
            <div className="w-full lg:w-[90%] mx-auto">
                <div className="md:flex justify-center items-center md:space-x-10">
                    <section className="w-full lg:w-1/2 lg:max-w-[450px]">
                        <div className="flex justify-center py-5">
                            <Brand />
                        </div>
                        <div className="bg-white border shadow-sm rounded-xl border-gray-200 rounded p-5 md:p-8">
                            <div className="pb-5 flex justify-evenly items-center space-x-3">
                                <h2 className="text-center text-lg text-gray-700">
                                    Create a new account
                                </h2>
                                <Link
                                    href={"/guide"}
                                    className="flex justify-center items-center space-x-2 border-b border-blue-600">
                                    <ArrowRightIcon aria-hidden="true" className="size-4" />
                                    <span className="text-sm text-gray-900">Guide</span>
                                </Link>
                            </div>

                            <div>
                                <div className="space-y-6" >
                                    <div className="py-2 grid grid-cols-1 md:grid-cols-1 gap-4">

                                        <div>
                                            <DomainNameField
                                                label="Domain Name"
                                                type="text"
                                                placeholder="companyname"
                                                onChange={(e: string) => {
                                                    const rawInput = `${e}`.replaceAll(/\s/g, '')
                                                    const input = `${rawInput.toLowerCase()}`

                                                    checkIfDomainIsAvailable(input)
                                                }}
                                                onInput={(e: string) => {
                                                    const rawInput = `${e}`.replaceAll(/\s/g, '')
                                                    const input = `${rawInput.toLowerCase()}`
                                                    setSiteNameAvailable(false)
                                                    setSubDomainName(input);
                                                    setFormError({ ...formError, domainName: validate.domainName(input) ? undefined : 'Invalid domain name' });
                                                }}
                                                value={subdomainName}
                                                error={formError?.domainName}
                                                available={siteNameAvailable}
                                                domainName={`${subdomainName}.mevinai.com`}
                                                loading={checkingDomainName}
                                                isRequired
                                            />
                                        </div>

                                        <div className="py-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <TextField
                                                    label="First Name"
                                                    type="text"
                                                    placeholder="Enter your first name"
                                                    onChange={(e: string) => {
                                                        setUser({ ...user, firstName: e })
                                                        setFormError({ ...formError, firstName: validate.firstName(e) ? undefined : 'Invalid first name' })
                                                    }}
                                                    value={user?.firstName || ""}
                                                    error={formError?.firstName}
                                                    isRequired
                                                />
                                            </div>

                                            <div>
                                                <TextField
                                                    label="Last Name"
                                                    type="text"
                                                    placeholder="Enter your last name"
                                                    onChange={(e: string) => {
                                                        setUser({ ...user, lastName: e })
                                                        setFormError({ ...formError, lastName: validate.lastName(e) ? undefined : 'Invalid last name' })
                                                    }}
                                                    value={user?.lastName || ""}
                                                    error={formError?.lastName}
                                                    isRequired
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <TextField
                                                label="Email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                onLeave={(e: string) => checkIfEmailIsAvailable(e)}
                                                onChange={(e: string) => {
                                                    const rawInput = `${e}`.replaceAll(/\s/g, '')
                                                    const input = `${rawInput.toLowerCase()}`
                                                    setUser({ ...user, email: input })
                                                    setFormError({ ...formError, email: validate.email(input) ? undefined : 'Invalid email address' })
                                                }}
                                                value={user?.email || ""}
                                                error={formError?.email}
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                label="Phone Number"
                                                placeholder="Enter your phone number"
                                                onChange={(e: string) => {
                                                    setUser({ ...user, phone: e })
                                                    setFormError({ ...formError, phone: validate.phoneNumber(e) ? undefined : 'Invalid phone number' })
                                                }}
                                                value={user?.phone || ""}
                                                error={formError?.phone}
                                                isRequired
                                            />
                                        </div>

                                        <div>
                                            <PasswordField
                                                label="Password"
                                                placeholder="password"
                                                onChange={(e: string) => {
                                                    setUser({ ...user, password: e })
                                                    setFormError({ ...formError, password: validate.password(e) ? undefined : 'Password must be more than 4 characters' })
                                                }}
                                                value={user?.password || ""}
                                                error={formError?.password}
                                                isRequired
                                            />
                                        </div>

                                    </div>

                                    <div className="flex justify-center">
                                        <Button
                                            disabled={!validate.signupForm(formError) || status == "loading" || !siteNameAvailable}
                                            bgColor={!validate.signupForm(formError) || status == "loading" || !siteNameAvailable ? 'bg-gray-400' : 'border-[#1677FF] bg-[#1677FF] hover:bg-green-500 hover:border-green-500'}
                                            title={status == "loading" && !checkingDomainName && !checkingEmail ? 'Creating your account ...' : "Start your 7 day free trial"}
                                            isLoading={status == "loading" && !checkingDomainName && !checkingEmail}
                                            onclick={submit}
                                            px="w-full"
                                        />
                                    </div>
                                </div>
                                <p className="mt-5 text-center text-sm/6 text-gray-500">
                                    Already have an account?
                                    <Link href="/user/login" className="px-2 font-semibold text-blue-600 hover:text-blue-500">
                                        Sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

        </div>
    )
}