'use client';

import { Brand, Button, PasswordField, TextField } from "@/components";
import show from "@/lib/toast";
import validate from "@/lib/validator";
import { login, resetPassword } from "@/redux/slices/userSlice";
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';




export default function ResetPassword() {

    const [user, setUser] = useState<any>(null);
    const [formError, setFormError] = useState<any>(null);
    const router = useRouter();
    const { code } = useParams()
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        // Validate form inputs for any errors
        validate.signinForm(formError);
    }, [formError]);



    const { status } = useSelector((state: RootState) => state.user);

    const submit = async () => {
        if (!user || (!user.password)) {
            show.error("Please fill your password field with valid information!")
        }
        else {
            const result = await dispatch(resetPassword({ password: user?.password, token: `${code}` }));
            if (result.type == "user/resetPassword/fulfilled") {
                show.success("Congratulation! Your password has been resetted in successfully.")
                router.push('/home');
            }
            if (result.type == "user/resetPassword/rejected")
                show.error(`Unable to reset your password. Try again.`)
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
                                Reset your password
                            </h2>

                            <div className="sm:mx-auto sm:w-full md:max-w-sm">
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                        <div>
                                            <PasswordField
                                                label={"Password"}
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
                                            title={status == "loading" ? 'Resetting ...' : "Reset password"}
                                            isLoading={status == "loading"}
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
