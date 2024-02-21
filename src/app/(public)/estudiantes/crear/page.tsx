"use client";

import { ChangeEvent, FormEvent, useState } from "react";

export default function CreateStuden () {
    const [data, setData] = useState({fullname:'',num:0});
    const [error, setError] = useState<string | null>(null);
    const [load, setLoad] = useState(false);

    const HandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const prev = {
            ...data,
            [e.target.name]: e.target.value
        }
        setData(prev);
    }

    const HandleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoad(true);

        if(!data.num) {
            setError('input.num');
            return setLoad(false);
        }
        if(!data.fullname) {
            setError('input.fullname');
            return setLoad(false);
        }


        const Create = async () => {
            console.log('creando', data);

            const formData = new FormData();
            formData.append('fullname', data.fullname);
            formData.append('num', `${data.num}`);

            const requetsOptions = {
                method:'POST',
                body: formData
            }

            const requets = await fetch('/api/student', requetsOptions);
            const json = await requets.json();

            if(json.response == 'SUCCESS_CREATE_STUDENT') {
                console.log('estudiante creado');
                const prevData = {...data, fullname:''};
                setData(prevData);
            }   
            setLoad(false);
            return setError(null);         
        }

        Create();
    }

    return (
        <div className='w-screen h-full grid place-items-center'>
            <div className='p-5 rounded-lg bg-white shadow-lg w-[90%] lg:w-[60%]'>
                <h2 className='text-2xl font-bold text-gray-800 text-center'>Crear Estudiante</h2>
                <form onSubmit={HandleSubmit} className='grid gap-3'>
                    <label className='grid lg:grid-cols-[180px_1fr]'>
                        <span className='text-lg font-extralight'>Número</span>
                        <input name='num' onChange={HandleChange} type='number' className='w-full p-2 rounded-md border outline-none' placeholder='1' />
                        { error == 'input.num' && <p className='text-sm text-red-600'>Debes completar este campo</p> }
                    </label>

                    <label className='grid lg:grid-cols-[180px_1fr]'>
                        <span className='text-lg font-extralight'>Nombre Completo</span>
                        <input name='fullname' onChange={HandleChange} type='text' className='w-full p-2 rounded-md border outline-none' placeholder='Nombre Nombre Apellido Apellido' />
                        { error == 'input.fullname' && <p className='text-sm text-red-600'>Debes completar este campo</p> }
                    </label>

                    <div className='w-full flex justify-end'>
                        <input type="submit" value={load ? 'creando' : 'crear'} className='font-bold w-[25%] bg-indigo-500 hover:bg-indigo-600 rounded-md p-2 relative right-0 text-white' />
                    </div>
                </form>
            </div>
        </div>
    )
}
