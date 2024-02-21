"use client";

import { Student } from "../../estudiantes/page";
import generatePDF, { Margin } from 'react-to-pdf';
import { useEffect, useRef, useState } from "react";

export default function ExportLapso1 () {
    const tableRef = useRef(null);

    const [load, setLoad] = useState(false);
    const [students, setStudents] = useState<Student[] | null>(null);

    useEffect(() => {

        const Getting = async () => {
            setLoad(true);
            const result = await fetch('/api/student');
            const json = await result.json();
            setStudents(json.body as Student[]);
            setLoad(false);
        }
        Getting();

    }, []);

    const SumNot = ({notas}: {notas:string}) => {
        const arr = notas.split(' ');
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += Number(arr[i])
        }
        return Math.round((sum/3) * 100) / 100;
    }

    return (
        <div>
            <button
                onClick={() => generatePDF(tableRef, {filename: 'Notas Primer Lapso.pdf', page:{margin:Margin.MEDIUM, orientation:"p"}})}
                className='bg-red-500 mx-auto hover:bg-red-600 rounded-br-md font-bold text-center py-3 px-10'
            >
                Descargar PDF
            </button>
            {
                load 
                ? <span>cargando estudiantes...</span>
                :   <div ref={tableRef} className='w-full grid place-items-center gap-5 pt-5 p-10'>
                        <h2 className='text-center text-5xl font-extralight text-gray-800'>NOTAS PRIMER LAPSO</h2>
                        <p className='text-center text-xl font-extralight text-gray-800'>DOCENTE: <b>DERWIS RODRÍQUEZ</b></p>
                        <p className='text-center text-xl font-extralight text-gray-800'>ASIGNATURA: <b>ÍNGLES</b></p>
                    
                        <table ref={tableRef} className='w-full bg-white'>
                            <thead>
                                <tr className='grid grid-cols-6 w-full'>
                                    <td className='border text-center py-3 text-xl font-bold text-gray-800 col-span-1'>Número</td>
                                    <td className='border text-center py-3 text-xl font-bold text-gray-800 col-span-2'>Nombres y Apellidos</td>
                                    <td className='border text-center py-3 text-xl font-bold text-gray-800 col-span-1'>Primer Lapso</td>
                                    <td className='border text-center py-3 text-xl font-bold text-gray-800 col-span-2'>Comentario</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    students && students.map((st)=>(
                                        <tr className='grid grid-cols-6' key={st.id}>
                                            <td className='border text-center py-3 text-md text-gray-700 col-span-1'>{st.id}</td>
                                            <td className='border text-center py-3 text-md text-gray-700 col-span-2'>{st.fullname}</td>
                                            <td className='border text-center py-3 text-md text-gray-700 col-span-1'>{ SumNot({notas:st.notas_reference.l1}) }</td>
                                            <td className='border text-center py-3 text-md text-gray-700 col-span-2'>{st.notas_reference.coment1}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
            }

        </div>
    )


}
