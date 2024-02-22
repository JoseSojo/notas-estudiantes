"use client"

import { useNotification } from "@/_contexts/Notification"
import { useEffect } from "react";

export const Notification = () => {
    const noti = useNotification();

    useEffect(() => {

        setTimeout(() => {
            const newNoti = {
                active: false,
                noti: null
            }
            noti.update(newNoti);
        }, 1500);
    }, []);

    return (
        <>
            {
                noti.noti.active && 
                <section className='
                    w-[90%] md:w-[40%] lg:w-[30%]
                    bottom-10 left-auto right-auto absolute
                    rounded-lg bg-white shadow-lg hover:shadow-sm
                '>
                    <div className='w-full h-full p-4 relative rounded-lg'>
                        {`${noti.noti.noti?.noti}`}
                        <button 
                            onClick={()=>  noti.update({active: false,noti: null}) }
                            className='absolute cursor-pointer -top-3 -right-3 w-[30px] h-[30px] flex justify-center items-center rounded-full text-sm font-bold bg-amber-500 hover:bg-amber-600'
                        >
                            X
                        </button>
                    </div>
                </section>
            }
        </>
    )

}
