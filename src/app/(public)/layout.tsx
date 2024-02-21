"use client";

import { ReactNode, useState } from "react";
import "./NavResponsive.css";
import { ButtonNav } from "@/_components/personality/ButtonNav";

export default function StudentLayout({ children }: {children:ReactNode}) {
    const [active, setActive] = useState(false);

    return (
        <div className={`grid grid-rows-[60px_1fr] grid-cols-1 min-h-screen bg-gray-200`}>

            <nav className='col-span-2 bg-gray-50 w-full shadow flex justify-between items-center px-5 lg:px-10'>
                <h1 className='font-extrabold text-2xl text-gray-700'>Notas</h1>

                <div className='relative'>

                    <button className="btn" onClick={()=>setActive(!active)}>
                        <span className="icon">
                            <svg viewBox="0 0 175 80" width="40" height="40">
                                <rect width="80" height="15" fill="#212529" rx="10"></rect>
                                <rect y="30" width="80" height="15" fill="#212529" rx="10"></rect>
                                <rect y="60" width="80" height="15" fill="#212529" rx="10"></rect>
                            </svg>
                        </span>
                    </button>

                    {
                        active && 
                        <div className="input">
                            <ButtonNav to='/' text='inicio' />
                            <ButtonNav to='/estudiantes' text='estudiantes' />
                            <ButtonNav to='/estudiantes/crear' text='crear' />
                            <ButtonNav to='/estudiantes/evaluar' text='evaluar' />
                        </div>
                    }

                </div>
            </nav>

            <main className='w-full'>
                {children}
            </main>

        </div>
    );
}

