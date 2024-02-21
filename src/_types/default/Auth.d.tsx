import { Dispatch, SetStateAction } from "react";


export interface StructAuth {
    auth: boolean,
    update: Dispatch<SetStateAction<boolean>>
}
