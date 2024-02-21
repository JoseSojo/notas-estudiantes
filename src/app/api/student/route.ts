"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "prisma/prisma-client";

 
export async function POST(req: NextRequest) {
    const prisma = new PrismaClient();

    const data = await req.formData();
    const fullname: string = data.get("fullname") as string;
    const num: string = data.get("num") as string;
  
    if(!fullname) return NextResponse.json({ response:'DANGER_NOT_FULLNAME', ok:false});
    if(!num) return NextResponse.json({ response:'DANGER_NOT_NUM', ok:false});

    const notSave = {
        definitiva: 0,
        l1: '0 0 0',
        l2: '0 0 0',
        l3: '0 0 0',
        coment1: '',
        coment2: '',
        coment3: '',
        inasistencial1: 0,
        inasistencial2: 0,
        inasistencial3: 0,
    }
    const not = await prisma.notas.create({ data:notSave });

    const newStudent = {fullname:`${fullname}`, num:Number(num), notasId:not.id};
    const result = await prisma.studens.create({ data: newStudent });

    return NextResponse.json({ response:'SUCCESS_CREATE_STUDENT', ok:true, body:result});
}

export async function PUT(req: NextRequest) {
    const prisma = new PrismaClient();

    const data = await req.formData();
    const fullname: string = data.get("fullname") as string;
    const num: string = data.get("num") as string;
    const id: string = data.get("id") as string;
    const asistencias: string = data.get("asistencias") as string;
    const inasistencias: string = data.get("inasistencias") as string;

    console.log(asistencias, inasistencias);

    const result = await prisma.studens.update({ 
        data: {
            asistencias:asistencias,
            inasistencias:inasistencias,
            fullname,
            num: Number(num)
        }, 
        where: { id:Number(id) } 
    });
    return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true, body:result});
}

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();

    const result = await prisma.studens.findMany({
        include: {
            notas_reference: true
        },
        orderBy: {
            num: "asc"
        }
    });

    return NextResponse.json({ response:'SUCCESS_GET_STUDENT', ok:true, body:result});
}
