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


export default function Settings() {

    const [user, setUser] = useState<any>(null)
    const [subdomainName, setSubDomainName] = useState("")
    const [siteNameAvailable, setSiteNameAvailable] = useState<boolean>(false)
    const [checkingDomainName, setCheckingDomainName] = useState<boolean>(false)
    const [checkingEmail, setCheckingEmail] = useState<boolean>(false)
    const [formError, setFormError] = useState<any>(null)
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        validate.signupForm(formError)
    }, [formError])

    const { status } = useSelector((state: RootState) => state.user);
    const submit = async () => {
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
        setCheckingEmail(true)
        if (email) {
            const result = await dispatch(checkEmailExistence(email));
            if (result.type == "user/checkEmailExistence/fulfilled") {
                setFormError({ ...formError, email: result.payload?.inuse == true ? 'This email is already in use. Try with an other email.' : undefined });
            }
        }
        setCheckingEmail(false)
    };


    const checkIfDomainIsAvailable = async (domainName: string) => {
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

    return (
        <div className="py-24">
            <div className="md:ml-[140px] w-[90%] md:max-w-[85%] mx-auto">
                <h2 className="pb-5 text-center text-lg text-gray-700">
                    Update your profile
                </h2>
                <div className="w-full bg-white border border-gray-200 rounded-xl p-5">

                    <div >
                        <h2 className="py-3 text-lg text-gray-700">
                            Personal Information
                        </h2>
                        <div className="py-1 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email address"
                                    onLeave={(e: string) => checkIfEmailIsAvailable(e)}
                                    onChange={(e: string) => {
                                        const input = `${e.toLowerCase()}`
                                        setUser({ ...user, email: input })
                                        setFormError({ ...formError, email: validate.email(input) ? undefined : 'Invalid email address' })
                                    }}
                                    value={user?.email || ""}
                                    error={formError?.email}
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
                                />
                            </div>
                        </div>
                        <div className="mt-5 py-4 flex justify-start items-center space-x-2">
                            <h2 className="w-[60%] md:w-[20%] text-lg text-gray-700">
                                Company Information
                            </h2>
                            <div className="w-[40%] md:w-[80%] border-b bg-gray-400"></div>
                        </div>
                        <div className="py-1 grid grid-cols-1 md:grid-cols-3 gap-4">

                           <div>
                                <TextField
                                    label="Company Name"
                                    type="text"
                                    disabled
                                    value={user?.siteName}
                                    placeholder="Enter your company name"
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Company Type"
                                    type="text"
                                    disabled
                                    value={user?.siteName}
                                    placeholder="e.g. Private Limited Company"
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Industry"
                                    type="text"
                                    disabled
                                    value={user?.siteName}
                                    placeholder="e.g. Technology"
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Number of employees"
                                    type="text"
                                    disabled
                                    value={user?.siteName}
                                    placeholder="e.g. 10"
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Company Website"
                                    type="text"
                                    disabled
                                    value={user?.siteName}
                                    placeholder="Enter your company website"
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Company Email"
                                    type="text"
                                    disabled
                                    value={user?.siteName}
                                    placeholder="Enter your company email"
                                />
                            </div>

                        </div>

                        <div className="w-[90%] md:max-w-[200px] mr-auto">
                            <Button
                                disabled={!validate.signupForm(formError) || status == "loading" || !siteNameAvailable}
                                bgColor={validate.signupForm(formError) && status != "loading" && siteNameAvailable ? 'border-[#1677FF] bg-[#1677FF] hover:bg-green-500 hover:border-green-500' : 'bg-gray-400'}
                                title={status == "loading" && !checkingDomainName && !checkingEmail ? 'Saving changes' : "Save Changes"}
                                isLoading={status == "loading" && !checkingDomainName && !checkingEmail}
                                onclick={submit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}