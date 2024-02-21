"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "prisma/prisma-client";

export async function PUT(req: NextRequest) {
    const prisma = new PrismaClient();

    const data = await req.formData();
    const coment: string = data.get("coment") as string;
    const code: string = data.get("code") as string;
    const userId: string = data.get("userId") as string;

    const user = await prisma.studens.findFirst({ where:{id:Number(userId)} });
    const notas = await prisma.notas.findFirst({ where:{ id:user?.id } });

    console.log(coment, code, userId);

    if(code == 'LAPSO_1_CUALITY') {
        await prisma.notas.update({
            data: {coment1:coment},
            where: {id:notas?.id}
        });
        return NextResponse.json({ response:'SUCCESS_UPDATE_CUALITY_STUDENT', ok:true });
    }

    if(code == 'LAPSO_2_CUALITY') {
        await prisma.notas.update({
            data: {coment2:coment},
            where: {id:notas?.id}
        });
        return NextResponse.json({ response:'SUCCESS_UPDATE_CUALITY_STUDENT', ok:true });
    }

    if(code == 'LAPSO_3_CUALITY') {
        await prisma.notas.update({
            data: {coment3:coment},
            where: {id:notas?.id}
        });
        return NextResponse.json({ response:'SUCCESS_UPDATE_CUALITY_STUDENT', ok:true });
    }

    return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
}
