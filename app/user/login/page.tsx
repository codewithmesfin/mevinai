'use client';

import { Brand, Button, PasswordField, TextField } from "@/components";
import show from "@/lib/toast";
import validate from "@/lib/validator";
import { login } from "@/redux/slices/userSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';


export default function Login() {
    const [user, setUser] = useState<any>(null);
    const [formError, setFormError] = useState<any>(null);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Validate form inputs for any errors
        validate.signinForm(formError);
    }, [formError]);



    const { status } = useSelector((state: RootState) => state.user);

    const submit = async () => {
        if (!user || (!user.email || !user.password)) {
            show.error("Please fill your email and password fields with valid information!")
        }
        else {
            try {
                const result = await dispatch(login({ email: `${user?.email}`.toLowerCase(), password: user?.password }));

                if (result.type == "user/login/rejected")
                    show.error(`Unable to login to your account. Try again.`)
                else {
                    router.push('/home');
                }
            } catch (err) {
                show.error(`Unable to login to your account. Try again.`)
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
                                Sign In to Your Account
                            </h2>

                            <div className="sm:mx-auto sm:w-full md:max-w-sm">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                                        <div>
                                            <TextField
                                                label="Email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                onChange={(e: string) => {
                                                    setUser({ ...user, email: e });
                                                    setFormError({ ...formError, email: validate.email(e) ? undefined : 'Invalid email address' });
                                                }}
                                                value={user?.email || ""}
                                                error={formError?.email}
                                            />
                                        </div>

                                        <div>
                                            <PasswordField
                                                label={
                                                    <div className="flex justify-between space-x-4">
                                                        <span>Password</span>
                                                        <Link href="/user/password/reset-request" className="px-1 text-blue-600 hover:text-blue-500">
                                                            Forgot password?
                                                        </Link>
                                                    </div>
                                                }
                                                placeholder="Type your password"
                                                onChange={(e: string) => {
                                                    setUser({ ...user, password: e });
                                                    setFormError({ ...formError, password: validate.password(e) ? undefined : 'Password must be more than 4 characters' });
                                                }}
                                                value={user?.password || ""}
                                                error={formError?.password}
                                            />
                                        </div>

                                    </div>

                                    <div className="flex justify-center">
                                        <Button
                                            disabled={!validate.signinForm(formError) || status == "loading"}
                                            bgColor={validate.signinForm(formError) && status != "loading" ? 'border-[#1677FF] bg-[#1677FF] hover:bg-green-500 hover:border-green-500' : 'bg-gray-400'}
                                            title={status == "loading" ? 'Trying to login ...' : "Sign in"}
                                            isLoading={status == "loading"}
                                            onclick={submit}
                                            px="w-full"
                                        />
                                    </div>

                                    {formError?.general && (
                                        <p className="text-red-500 text-sm text-center mt-2">{formError?.general}</p>
                                    )}
                                </div>

                                <p className="mt-5 text-center text-sm/6 text-gray-500">
                                    Not a member?
                                    <Link href="/user/signup" className="px-2 font-semibold text-blue-600 hover:text-blue-500">
                                        Start your 7-day free trial
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
