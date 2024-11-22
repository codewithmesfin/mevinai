
'use client';

import { Brand, Button, PasswordField, TextField } from "@/components";
import show from "@/lib/toast";
import validate from "@/lib/validator";
import { checkEmailExistence, login, verifyEmail } from "@/redux/slices/userSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


export default function PasswordResetRequest() {
    const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<any>(null);
    const [formError, setFormError] = useState<any>(null);
    const router = useRouter();
    const [checkingEmail, setCheckingEmail] = useState<boolean>(false)

    useEffect(() => {
        // Validate form inputs for any errors
        validate.signinForm(formError);
    }, [formError]);


    const { status } = useSelector((state: RootState) => state.user);

    const checkEmailExistance = async (email: string) => {
        setCheckingEmail(true)
        if (email) {
            const result = await dispatch(checkEmailExistence(email));
            if (result.type == "user/checkEmailExistence/fulfilled") {
                setFormError({ ...formError, email: result.payload?.inuse == false ? 'This email is not exist on our system.' : undefined });
            }
        }
        setCheckingEmail(false)
    }

    const submit = async () => {
        if (!user || (!user.email)) {
            show.error("Please fill your email field with valid information!")
        }
        else {
            const result = await dispatch(verifyEmail(user?.email));
            if (result.type == "user/verifyEmail/fulfilled") {
                show.info(`Dear user, we sent a verification code to your email,${user?.email}. Please check your email and follow the instruction.`)
                router.push("/user/password/sent")
            }
        }
    };

    return (
        <div className="bg-gray-100 flex min-h-full flex-1 flex-col justify-center px-3 md:px-6 py-3 pb-24">
            <div className="w-full lg:w-[90%] mx-auto">
                <div className="md:flex justify-center items-center md:space-x-10">
                    <section className="w-full lg:w-1/2 lg:max-w-[400px]">
                        <div className="flex justify-center py-5">
                            <Brand />
                        </div>
                        <div className="bg-white border shadow-sm rounded-xl border-gray-200 rounded p-5 md:p-8">
                            <h2 className="pb-5 text-center text-lg text-gray-700">
                                Verify your email address
                            </h2>

                            <div className="sm:mx-auto sm:w-full md:max-w-sm">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                                        <div>
                                            <TextField
                                                label="Email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                onLeave={(e: string) => checkEmailExistance(e)}
                                                onChange={(e: string) => {
                                                    const input = `${e.toLowerCase()}`
                                                    setUser({ ...user, email: input })
                                                    setFormError({ ...formError, email: validate.email(input) ? undefined : 'Invalid email address' })
                                                }}
                                                value={user?.email || ""}
                                                error={formError?.email}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <Button
                                            disabled={!validate.signinForm(formError) || status == "loading" && !checkingEmail}
                                            bgColor={validate.signinForm(formError) && status != "loading" && !checkingEmail ? 'border-[#1677FF] bg-[#1677FF] hover:bg-green-500 hover:border-green-500' : 'bg-gray-400'}
                                            title={status == "loading" && !checkingEmail ? 'Sending email ...' : "Verify email"}
                                            isLoading={status == "loading" && !checkingEmail}
                                            onclick={submit}
                                            px='w-full'
                                        />
                                    </div>

                                    {formError?.general && (
                                        <p className="text-red-500 text-sm text-center mt-2">{formError?.general}</p>
                                    )}
                                </div>

                                <p className="mt-5 text-center text-sm/6 text-gray-500">
                                    Remebered your password?
                                    <Link href="/user/login" className="px-2 font-semibold text-blue-600 hover:text-blue-500">
                                        Go to sign in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
