import { Toast } from 'flowbite-react'
import React from 'react'
import { HiCheck } from "react-icons/hi";

export default function SuccessToast({ setShowSuccessToast, message }) {
    return (
        <>

            <Toast className="fixed top-6 left-1/2 transform -translate-x-1/2">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                    <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                    {message}
                </div>
                <Toast.Toggle onClick={() => setShowSuccessToast(false)} />
            </Toast>
        </>
    )
}
