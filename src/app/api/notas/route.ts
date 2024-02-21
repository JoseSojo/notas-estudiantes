"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "prisma/prisma-client";

export async function PUT(req: NextRequest) {
    const prisma = new PrismaClient();

    const data = await req.formData();
    const nota: string = data.get("nota") as string;
    const what: string = data.get("what") as string;
    const userId: string = data.get("userId") as string;

    const user = await prisma.studens.findFirst({ where:{id:Number(userId)} });
    const notas = await prisma.notas.findFirst({ where:{ id:user?.id } });

    console.log(nota, what, userId);

    // 1
    if(what == 'NOTA_LAP_1_EV_1') {
        const test = notas?.l1.split(' ') as string[];
        test[0] = nota;
        const notaResult = test.join(' ');
        await prisma.notas.update({ data:{l1:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    else if(what == 'NOTA_LAP_1_EV_2') {
        const test = notas?.l1.split(' ') as string[];
        test[1] = nota;
        const notaResult = test.join(' ');
        await prisma.notas.update({ data:{l1:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    else if(what == 'NOTA_LAP_1_EV_3') {
        const test = notas?.l1.split(' ') as string[];
        test[2] = nota;
        const notaResult = test.join(' ');
        await prisma.notas.update({ data:{l1:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    // 2
    else if(what == 'NOTA_LAP_2_EV_1') {
        const test = notas?.l2.split(' ') as string[];
        test[0] = nota;
        const notaResult = test.join(' ');
        console.log(notaResult);
        await prisma.notas.update({ data:{l2:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    else if(what == 'NOTA_LAP_2_EV_2') {
        const test = notas?.l2.split(' ') as string[];
        test[1] = nota;
        const notaResult = test.join(' ');
        console.log(notaResult);
        await prisma.notas.update({ data:{l2:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    else if(what == 'NOTA_LAP_2_EV_3') {
        const test = notas?.l2.split(' ') as string[];
        test[2] = nota;
        const notaResult = test.join(' ');
        console.log(notaResult);
        await prisma.notas.update({ data:{l2:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    // 3
    else if(what == 'NOTA_LAP_3_EV_1') {
        const test = notas?.l3.split(' ') as string[];
        test[0] = nota;
        const notaResult = test.join(' ');
        console.log(notaResult);
        await prisma.notas.update({ data:{l3:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    else if(what == 'NOTA_LAP_3_EV_2') {
        const test = notas?.l3.split(' ') as string[];
        test[1] = nota;
        const notaResult = test.join(' ');
        console.log(notaResult);
        await prisma.notas.update({ data:{l3:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    else if(what == 'NOTA_LAP_3_EV_3') {
        const test = notas?.l3.split(' ') as string[];
        test[2] = nota;
        const notaResult = test.join(' ');
        console.log(notaResult);
        await prisma.notas.update({ data:{l3:notaResult}, where:{id:Number(`${notas?.id}`)} });
        return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
    }

    return NextResponse.json({ response:'SUCCESS_UPDATE_STUDENT', ok:true });
}
