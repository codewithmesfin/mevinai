'use client';

import { Button, TextField } from "@/components";
import validate from "@/lib/validator";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from "@/redux/store";
import { getUserSites, register, updateUserInfo } from "@/redux/slices/userSlice";
import show from "@/lib/toast";
import { USER } from "@/types/user";
import { getUserId } from "@/lib/auth";
import LoadingIndicator from "@/components/LoadingIndicator";


export default function Settings() {
    const [user, setUser] = useState<any>()
    const [formError, setFormError] = useState<any>(null)
    const [saving, setSaving] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        validate.updateProfileForm(formError)
    }, [formError])



    useEffect(() => {
        const userId = getUserId()
        if (userId) {
            getUserInfo(userId)
        }
    }, [])


    const getUserInfo = async (userId: string) => {
        setLoading(true)
        const result = await dispatch(getUserSites(userId));
        if (result.type == "user/getUserSites/fulfilled") {
            const usr = result.payload?.user
            setUser(usr)
        }
        setLoading(false)
    }


    const submit = async () => {

        if (!user || (!user.firstName || !user.lastName || !user.email || !user.phone)) {
            show.error("Please fill all form fields with valid information!")
        }
        else {
            setSaving(true)
            try {
                const userId = getUserId()
                const result = await dispatch(updateUserInfo({ ...user, _id: userId }));
                console.log(result)
                if (result.type == "user/updateUserInfo/rejected")
                    show.error(`Unable to update your profile. Try again.`)
                if (result.type == "user/updateUserInfo/fulfilled") {
                    const usr = result?.payload?.user
                    show.success("Congratulation! Your profile has been updated successfully.")
                    setUser(usr);
                }
                setSaving(false)
            } catch (err) {
                show.error(`Unable to update your prifle. Try again.`)
                setSaving(false)
            }
        }
    }

    if (loading)
        return (<div className='flex space-x-4 justify-center items-center h-screen'>
            <LoadingIndicator />
        </div>)


    return (
        <div className="md:py-16">
            <div className="md:ml-[140px] w-[90%] md:max-w-[85%] mx-auto">
                <div>
                    <h2 className="py-10 text-center text-lg md:text-6xl text-gray-900">
                        Update your profile
                    </h2>
                </div>
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
                                    disabled
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
                            <h2 className="w-[70%] md:w-[20%] text-lg text-gray-700">
                                Company Information
                            </h2>
                            <div className="w-[30%] md:w-[80%] border-b bg-gray-400"></div>
                        </div>
                        <div className="py-1 grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div>
                                <TextField
                                    label="Company Name"
                                    type="text"
                                    value={user?.company?.name || ""}
                                    placeholder="Enter your company name"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, name: e } })
                                    }}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Company Type"
                                    type="text"
                                    value={user?.company?.type || ""}
                                    placeholder="e.g. Private Limited Company"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, type: e } })
                                    }}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Industry"
                                    type="text"
                                    value={user?.company?.industry || ""}
                                    placeholder="e.g. Technology"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, industry: e } })
                                    }}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Number of employees"
                                    type="number"
                                    value={user?.company?.noOfEmployee || ""}
                                    placeholder="e.g. 10"
                                    min="1"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, noOfEmployee: e } })
                                    }}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Company Website"
                                    type="text"
                                    value={user?.company?.website || ""}
                                    placeholder="Enter your company website"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, website: e } })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Company Email"
                                    type="text"
                                    value={user?.company?.email || ""}
                                    placeholder="Enter your company email"
                                    onChange={(e: string) => {
                                        const input = `${e.toLowerCase()}`
                                        setUser({ ...user, company: { ...user?.company, email: input } })
                                        setFormError({ ...formError, company: { ...formError, email: validate.email(input) ? undefined : 'Invalid email address' } })
                                    }}
                                    error={formError?.company?.email}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="Subcity"
                                    type="text"
                                    value={user?.company?.subcity || ""}
                                    placeholder="e.g. Arada"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, subcity: e } })
                                    }}
                                />
                            </div>

                            <div>
                                <TextField
                                    label="City"
                                    type="text"
                                    value={user?.company?.city || ""}
                                    placeholder="e.g. Addis Ababa"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, city: e } })
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    label="Region"
                                    type="text"
                                    value={user?.company?.region || ""}
                                    placeholder="e.g. Affar"
                                    onChange={(e: string) => {
                                        setUser({ ...user, company: { ...user?.company, region: e } })
                                    }}
                                />
                            </div>

                        </div>

                        <div className="w-[90%] md:max-w-[200px] mr-auto mt-10">
                            <Button
                                disabled={!validate.updateProfileForm(formError) || saving}
                                bgColor={validate.updateProfileForm(formError) && !saving ? 'border-[#1677FF] bg-[#1677FF] hover:bg-green-500 hover:border-green-500' : 'bg-gray-400'}
                                title={saving ? 'Saving changes' : "Save Changes"}
                                isLoading={saving}
                                onclick={submit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}