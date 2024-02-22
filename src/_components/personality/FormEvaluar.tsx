"use client";

import { useNotification } from "@/_contexts/Notification";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
    title: string,
    nota: number,
    setNota: Dispatch<SetStateAction<number>>,
    code: string,
    userId: number
}

export const FormEvaluar: FC<Props> = ({ title, nota, setNota, code, userId}) => {
    const [dev, ddsetEv] = useState([0,0,0,0]);
    const noti = useNotification();

    const sendNota = async ({nt}:{nt:string}) => {
        console.log('actualizando')
        const formData = new FormData();
        formData.append('nota', nt);
        formData.append('what', code);
        formData.append('userId', `${userId}`);

        const RequestOptions = {
            method: 'PUT',
            body: formData
        }

        const response = await fetch('/api/notas', RequestOptions);
        if(response.ok) {
            noti.update({ active:true, noti: { type:'SUCCESS', noti:'Estudiante evaluado' } });
        }
    }

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            const prev: number = dev[0]+dev[1]+dev[2]+dev[3];
            setNota(prev);
            sendNota({ nt:`${prev}` });
        }} className='p-5 rounded-lg bg-white w-full'>
            <h2 className='text-xl font-extralight text-gray-900'>{title} ({nota})</h2>
            <div className='grid grid-cols-1 gap-3'>
                <label className='grid w-full'>
                    <span>Conocer</span>
                    <input
                        onChange={(e)=>{
                            const prev = dev;
                            prev[0] = Number(e.target.value);
                            ddsetEv(prev);
                        }} 
                        type='number' 
                        min='1' 
                        max='3' 
                        className='w-full rounded-lg border outline-none p-2' 
                        placeholder='1 2 3' 
                        />
                </label>

                <label className='grid w-full'>
                    <span>Hacer</span>
                    <input
                        onChange={(e)=>{
                            const prev = dev;
                            prev[1] = Number(e.target.value);
                            ddsetEv(prev);
                        }} 
                        type='number' 
                        min='1' 
                        max='3' 
                        className='w-full rounded-lg border outline-none p-2' 
                        placeholder='1 2 3' 
                        />
                </label>

                <label className='grid w-full'>
                    <span>Ser</span>
                    <input
                        onChange={(e)=>{
                            const prev = dev;
                            prev[2] = Number(e.target.value);
                            ddsetEv(prev);
                        }} 
                        type='number' 
                        min='1' 
                        max='2' 
                        className='w-full rounded-lg border outline-none p-2' 
                        placeholder='1 2' 
                        />
                </label>

                <label className='grid w-full'>
                    <span>Convivir</span>
                    <input
                        onChange={(e)=>{
                            const prev = dev;
                            prev[3] = Number(e.target.value);
                            ddsetEv(prev);
                        }} 
                        type='number' 
                        min='1' 
                        max='2' 
                        className='w-full rounded-lg border outline-none p-2' 
                        placeholder='1 2' 
                        />
                </label>
            </div>
            <button className='px-4 py-2 bg-emerald-400 hover:bg-emerald-500 rounded-md mt-3'>evaluar</button>
        </form>
    )
}
