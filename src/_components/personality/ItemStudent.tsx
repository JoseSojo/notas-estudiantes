"use client";

import { useNotification } from "@/_contexts/Notification";
import { Student } from "@/app/(public)/estudiantes/page";
import Link from "next/link";
import { ChangeEvent, FC, FormEvent, useState } from "react";

interface Props {
    student: Student
}

export const ItemStudent: FC<Props> = ({student}) => {
    const [load, setLoad] = useState(false);
    const [fullnameState, setFullnameState] = useState(student.fullname);
    const [numState, setNumState] = useState(student.num);
    const [asistencias, setAsistencias] = useState(student.asistencias ? student.asistencias : 0);
    const [inasistencias, setInasistencias] = useState(student.inasistencias ? student.inasistencias : 0);

    const noti = useNotification();

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const Create = async () => {
            setLoad(true);
            const formData = new FormData();
            formData.append('fullname', fullnameState);
            formData.append('num', `${numState}`);
            formData.append('id', `${student.id}`);
            formData.append('asistencias', `${asistencias}`);
            formData.append('inasistencias', `${inasistencias}`);

            const requetsOptions = {
                method:'PUT',
                body: formData
            }

            const requets = await fetch('/api/student', requetsOptions);
            const json = await requets.json();

            if(json.response == 'SUCCESS_CREATE_STUDENT') {
                noti.update({ active:true, noti:{type:'SUCCESS',noti:'estudiante actualizado'} });
            }   
            setLoad(false);        
        }
        Create();
    }

    return (
        <form className='w-full grid grid-cols-[150px_1fr_300px_100px_100px] border bg-white' onSubmit={HandleSubmit}>
            <input 
                onChange={(e)=>setNumState(e.target.value)} 
                name='num' 
                className='py-2 px-4' 
                value={numState} 
                />

            <input 
                onChange={(e)=>setFullnameState(e.target.value)} 
                name='fullname' 
                className='py-2 px-4 border-l border-x' 
                value={fullnameState} 
                />

            <div className='grid grid-cols-2 place-items-center border-l'>
                <input
                    onChange={(e)=>{setInasistencias(Number(e.target.value))}} 
                    name='inasistencias'
                    type='number' 
                    className='py-2 w-full text-center px-4 border-l border-x' 
                    placeholder='inasistencias'
                    value={inasistencias}

                    />

                <input
                    onChange={(e)=>{setAsistencias(Number(e.target.value))}} 
                    name='asistencias'
                    type='number' 
                    className='py-2 w-full text-center border-l border-x' 
                    placeholder='asistencia'
                    value={asistencias}
                    />
            </div>

            <button 
                type='submit' 
                className='bg-indigo-400 hover:bg-indigo-500 text-white font-cold text-center'
            >
                {load?'actualizando...':'actualizar'}
            </button>
            <button
                type='button'
                onClick={async()=>{
                    const form = new FormData();
                    form.append('delete', `${student.id}`)
                    const requetsOptions = { method: 'DELETE', body: form }
                    const response = await fetch('/api/student/', requetsOptions);
                    if(response.ok) {
                        noti.update({ active:true, noti:{type:'SUCCESS',noti:'estudiante eliminado'} });
                    }
                }}
                className='bg-red-400 hover:bg-red-500 text-white text-center font-bold'
            >
                eliminar
            </button>
        </form>
    )
}
