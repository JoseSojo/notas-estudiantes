"use server";

import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// import {Connect} from "@/_server/ConnectMongoDb";
// import anime from "@/_server/AnimeModel";
 
export async function POST(req: NextRequest) {
    // const stopConnect = Connect();

    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
        return NextResponse.json({ response:'DANGER_UPLOAD_FILE', ok: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const filePath = path.join(process.cwd(), "public", fileName);
    await writeFile(filePath, buffer);

    /*console.log('file creado', filePath);
    
    const newAnime = new anime({ 
        title: data.get('title'), 
        min: data.get('min'), 
        max: data.get('max'), 
        link: data.get('link'),
        secuela: data.get('secuela'),
        precuela: data.get('precuela'),
        duration: data.get('duration'),
        file: fileName
     });

     await newAnime.save();*/

    return NextResponse.json({ response:'SUCCESS', ok: true, file:fileName});
}
