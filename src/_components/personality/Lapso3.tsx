"use client";

import { Student } from "@/app/(public)/estudiantes/page";
import { FC, FormEvent, useState } from "react";
import { FormEvaluar } from "./FormEvaluar";

interface Props {
    user: Student
}

export const Lapso3: FC<Props> = ({ user }) => {
    const notasLapso = user.notas_reference.l3.split(' ');

    const [notas1, setNotas1] = useState(notasLapso[0] ? Number(notasLapso[0]) : 0);
    const [notas2, setNotas2] = useState(notasLapso[1] ? Number(notasLapso[1]) : 0);
    const [notas3, setNotas3] = useState(notasLapso[2] ? Number(notasLapso[2]) : 0);

    return (
        <>
            <h2 className='text-xl font-extrabold text-gray-800 text-center'>
                Tercer Lapso - {user.fullname} <span className='text-gray-700'>({((notas1+notas2+notas3)/3).toFixed(2)})</span>
            </h2>

            <div className='grid gris-cols-1 w-full lg:grid-cols-3 gap-5'>
                <FormEvaluar userId={user.id} code='NOTA_LAP_3_EV_1' nota={notas1} setNota={setNotas1} title='Evaluación 1' />
                <FormEvaluar userId={user.id} code='NOTA_LAP_3_EV_2' nota={notas2} setNota={setNotas2} title='Evaluación 2' />
                <FormEvaluar userId={user.id} code='NOTA_LAP_3_EV_3' nota={notas3} setNota={setNotas3} title='Evaluación 3' />
            </div>
        </>
    )
}
