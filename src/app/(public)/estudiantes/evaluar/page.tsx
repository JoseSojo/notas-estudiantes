"use client";

import { Lapso1 } from "@/_components/personality/Lapso1";
import { Lapso2 } from "@/_components/personality/Lapso2";
import { Lapso3 } from "@/_components/personality/Lapso3";
import { useEffect, useState } from "react";
import { Student } from "../page";
import { CualificarLapso } from "@/_components/personality/Cualificar";

type Lapso = 'Seleccionar Estudiante'|'Primer Lapso'|'Segundo Lapso'|'Tercer Lapso';

export default function EvaluarStudent () {
    const [load, setLoad] = useState(true);
    const [students, setStudents] = useState<Student[] | null>(null);
    const [studentSelectd, setStudentSelected] = useState<string | null>(null);

    const [lapso, setLapso] = useState<Lapso>('Seleccionar Estudiante');

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

    return (
        <div className='w-full flex flex-col justify-center items-center h-full gap-5 p-5'>

            <h2 className='text-4xl font-extrabold w-full text-center text-gray-800'>{lapso}</h2>

            {
                load 
                ? <div>cargando...</div>
                : <>
                    <div className={`grid place-items-center w-full p-5 gap-3 rounded-lg bg-white shadow-md`}>
                        <label className='grid w-[90%] lg:w-[50%]'>
                            <span>Selecionar Estudiante</span>
                            <select 
                                className='w-full py-2 border text-lg rounded-lg' 
                                onChange={(e)=>{
                                    setStudentSelected(`${e.target.value}`);
                                }}
                            >
                                <option>selecionar estudiante</option>
                                {
                                    students?.map(st => (
                                        <option key={st.id} value={st.num}>{st.num} - {st.fullname}</option>
                                    ))
                                }
                            </select>
                        </label>
                        <label className='grid w-[90%] lg:w-[50%]'>
                            <span>Selecionar Lapso</span>
                            <select 
                                className='py-2 border text-lg rounded-lg' 
                                onChange={(e)=>{
                                    setLapso(e.target.value as Lapso);
                                }}
                            >
                                <option>selecionar lapso</option>
                                <option value='Primer Lapso'>Primer Lapso</option>
                                <option value='Segundo Lapso'>Segundo Lapso</option>
                                <option value='Tercer Lapso'>Tercer Lapso</option>

                            </select>
                        </label>
                    </div>
                    
                    { !studentSelectd && <span>selecionar estudiante</span>}
                    { lapso === 'Seleccionar Estudiante' && <span>seleccionar lapso</span> }
                    { studentSelectd && lapso &&
                        <>
                            { 
                                lapso == 'Primer Lapso' && <>
                                    <Lapso1 user={ students?.find(s => s.num == studentSelectd) as Student } /> 
                                    <CualificarLapso 
                                        code="LAPSO_1_CUALITY"
                                        actual={students?.find(s => s.num == studentSelectd)?.notas_reference.coment1 as string}
                                        ubication="evaluación 1"
                                        username={students?.find(s => s.num == studentSelectd)?.fullname as string}
                                        id={`${students?.find(s => s.num == studentSelectd)?.id}` as string}
                                        />
                                </>}           
                            { 
                                lapso == 'Segundo Lapso' && <>
                                    <Lapso2 user={ students?.find(s => s.num == studentSelectd) as Student } /> 
                                    <CualificarLapso 
                                        code="LAPSO_2_CUALITY"
                                        actual={students?.find(s => s.num == studentSelectd)?.notas_reference.coment2 as string}
                                        ubication="evaluación 1"
                                        username={students?.find(s => s.num == studentSelectd)?.fullname as string}
                                        id={`${students?.find(s => s.num == studentSelectd)?.id}` as string}
                                        />
                                </>}           
                            { 
                                lapso == 'Tercer Lapso' && <>
                                    <Lapso3 user={ students?.find(s => s.num == studentSelectd) as Student } /> 
                                    <CualificarLapso 
                                        code="LAPSO_3_CUALITY"
                                        actual={students?.find(s => s.num == studentSelectd)?.notas_reference.coment3 as string}
                                        ubication="evaluación 1"
                                        username={students?.find(s => s.num == studentSelectd)?.fullname as string}
                                        id={`${students?.find(s => s.num == studentSelectd)?.id}` as string}
                                        />
                                </>}
                            
                        </>
                    }    
                </>      
            }
        </div>
    )
}