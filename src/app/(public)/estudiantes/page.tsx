"use client";

import { ItemStudent } from "@/_components/personality/ItemStudent";
import { useEffect, useState } from "react";

export interface Student {
    id: number,
    fullname: string,
    num: string,
    notasId: string,
    asistencias: string,
    inasistencias: string,
    notas_reference: {
        id: number,
        l1: string,
        l2: string,
        l3: string,
        definitiva: number,
        coment1: string,
        coment2: string,
        coment3: string
    }
}

export default function ListStuden () {
    const [load, setLoad] = useState(true);

    const [students, setStudents] = useState<Student[] | null>(null);

    useEffect(() => {

        const Getting = async () => {
            setLoad(true);

            const result = await fetch('/api/student');
            const json = await result.json();
            setStudents(json.body as Student[]);
            
            console.log(json.body[0]);
            setLoad(false);
        }

        Getting();

    }, []);

    return (
        <div className='w-full'>
            { load && <p className='text-center pt-7 text-2xl font-extralight text-gray-700'>cargando estudiantes...</p> }
            { !load && students && <>
                {
                    students.length <= 0
                    ? <p className='text-center pt-7 text-2xl font-extralight text-gray-700'>no hay estudiantes...</p>
                    : <section className='grid w-full px-10 pt-5'>
                        <p className='text-center pt-7 text-2xl font-extralight text-gray-700 mb-5'>Lista de estudiantes</p>
                        <div className='w-full grid grid-cols-[150px_1fr_300px_100px_100px] border bg-white'>
                            <span className='py-2 px-4'>Numero</span>
                            <span className='py-2 px-4 border-l border-x'>Nombre Completo</span>
                            <span className='py-2 px-4 border-l border-x flex justify-between items-center'><span>inasistencias</span> <span>asistencias</span></span>
                            <span className='py-2 px-4 border-l border-x'></span>
                            <span className='py-2 px-4 border-l border-x'></span>
                        </div>
                        {
                            students.map(etu => <ItemStudent student={etu} key={etu.id} />)
                        }
                    </section>
                }
            </> }
        </div>
    )
}
