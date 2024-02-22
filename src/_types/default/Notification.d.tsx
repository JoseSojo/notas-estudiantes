
import { Dispatch, SetStateAction } from 'react';

export interface Noti {
    type: 'SUCCESS' | 'WARNING' | 'DANGER',
    noti: string
}

export interface StructNoti {
    active: boolean,
    noti: Noti | null
}

export interface NotiContext {
    noti: StructNoti,
    update: Dispatch<SetStateAction<StructNoti>>
}
