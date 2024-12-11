

'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import LoadingIndicator from '@/components/LoadingIndicator'
import TextField from '../input/TextField'
import validate from '@/lib/validator'
import TextArea from '../input/TextArea'
import Button from '../button/Button'
import show from '@/lib/toast'
import api from '@/lib/api'


export default function SupportEmail() {

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState<any>(null)
    const [formError, setFormError] = useState<any>(null)
    useEffect(() => {
        validate.supportForm(formError)
    }, [formError])


    const submit = () => {
        if (!user || (!user.fullName || !user.email || !user.phone || !user.message)) {
            show.error(`Form validation error. Please fill all the form fields and submit the form again.`)
        }
        else {
            setLoading(true)
            const payload = {
                "emails": ["sciemesfin55@gmail.com", "shibeshi156@gmail.com "],
                "subject": `Customer Support - ${user?.phone}`,
                "message": `
                        Phone Number: ${user?.phone}
                        Email: ${user?.email}
                        Message: ${user?.message}
                    `
            }
            api.create(payload, "/send-support-email")
            .then(()=>{
                show.success(`Message sent successfully.`)
                setOpen(false)
                setLoading(false)
            })
            .catch(()=>{
                show.error(`Unable to send message. Try later`)
                setOpen(false)
                setLoading(false)
            })
        }
    }


    return (
        <div>
            <div className="cursor-pointer fixed right-5 bottom-10">
                <div className="rounded-full p-2 bg-[#1677FF] shadow-xl text-white"
                    onClick={() => setOpen(true)}
                >
                    <ChatBubbleOvalLeftEllipsisIcon aria-hidden="true" className="size-5 sm:size-8" />
                </div>
            </div>
            <Dialog open={open} onClose={() => { }} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="border border-gray-200 bg-gray-50 relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:size-16">
                                        <ChatBubbleOvalLeftEllipsisIcon aria-hidden="true" className="size-6 text-green-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                            Chat with our support team
                                        </DialogTitle>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Feel free to send us your message here, and one of our
                                                knowledgeable experts will get back to you as quickly
                                                as possible with the assistance you need.
                                            </p>
                                        </div>
                                        <div className="mt-4">
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <TextField
                                                        label="Full Name"
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        onChange={(e: string) => {
                                                            setUser({ ...user, fullName: e })
                                                            setFormError({ ...formError, fullName: validate.fullName(e) ? undefined : 'Invalid full name' })
                                                        }}
                                                        value={user?.fullName || ""}
                                                        error={formError?.fullName}
                                                        isRequired
                                                    />
                                                </div>
                                                <div>
                                                    <TextField
                                                        label="Email"
                                                        type="email"
                                                        placeholder="Enter your email address"
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
                                                    <TextArea
                                                        label="Message"
                                                        type="text"
                                                        placeholder="Enter your message"
                                                        onChange={(e: string) => {
                                                            setUser({ ...user, message: e })
                                                            setFormError({ ...formError, message: e.length > 30 ? undefined : 'Message must be atleast 30 characters.' })
                                                        }}
                                                        value={user?.message || ""}
                                                        error={formError?.message}
                                                        isRequired
                                                        isTextArea
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white px-4 py-3 sm:px-6">
                                {loading ?
                                    <LoadingIndicator />
                                    : <div className='sm:flex justify-end md:space-x-6'>
                                        <div>
                                            <Button
                                                disabled={!validate.supportForm(formError) || loading}
                                                bgColor={!validate.supportForm(formError) || loading ? 'bg-gray-400' : 'border-[#1677FF] bg-[#1677FF] hover:bg-green-500 hover:border-green-500'}
                                                title={loading ? 'Sending message ...' : "Send a message"}
                                                isLoading={loading}
                                                onclick={submit}
                                                px="w-full"
                                            />
                                        </div>
                                        <button
                                            data-autofocus
                                            onClick={() => setOpen(false)}
                                            className="inline-flex w-full justify-center items-center rounded-xl bg-white px-6 py-2 font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-white sm:mt-0 sm:w-auto"
                                        >
                                            Cancel
                                        </button>
                                    </div>}
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}
