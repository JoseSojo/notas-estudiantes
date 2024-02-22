"use client";

import { useNotification } from "@/_contexts/Notification";
import { FC, FormEvent, useState } from "react";

interface Props {
    username: string,
    ubication: string,
    code: string,
    id: string,
    actual: string
}

export const CualificarLapso: FC<Props> = ({username, ubication, code, id, actual}) => {
    const [load, setLoad] = useState(false);
    const [description, setDescription] = useState(actual ? actual : '');

    const noti = useNotification();

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const Cualificar = async () => {
            setLoad(true);

            const formData = new FormData();
            formData.append('coment', description);
            formData.append('code', code);
            formData.append('userId', id);
            
            const requetsOptions = {
                method:'PUT',
                body: formData
            }
            const response = await fetch('/api/cualify', requetsOptions)
            if(response.ok) {
                noti.update({ active:true, noti: { type:'SUCCESS', noti:'Estudiante cualificado' } });
            }
            setLoad(false);
        }

        Cualificar();
    }

    return (
        <div className='grid w-full lg:w-[50%] mx-auto p-8 rounded-lg bg-white mt-5'>
            <p className='text-lg text-gray-700'>Describa el desempeño de <b>{username}</b> en {ubication}</p>
            <form onSubmit={HandleSubmit} className='grid'>
                <textarea 
                    onChange={(e)=> setDescription(e.target.value)}
                    placeholder='Desempeño del estudiante' 
                    className='outline-none border shadow mt-5 rounded-lg p-4 min-h-[100px] text-md max-h-[120px]'
                >{description}</textarea>
                <button 
                    type='submit' 
                    className='py-3 mt-3 text-lg bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white'
                >
                    {load ? 'cualificando'  : 'Cualificar Evaluación'}
                </button>
            </form>
        </div>
    )
} 

