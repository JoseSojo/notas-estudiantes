"use client";

import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { StructNoti, NotiContext } from '@/_types/default/Notification.d';

const defaulNoti: StructNoti = {
    active: false,
    noti: null
}

const defaultContext: NotiContext = {
    noti: defaulNoti,
    update: () => {}
}

const NotificationContext = createContext(defaultContext);

interface Props {
    children: ReactNode
}

export const NotificationProvider: FC<Props> = ({children}) => {

    const [noti, setNoti] = useState<StructNoti>(defaulNoti);

    return (
        <NotificationContext.Provider
            value={{
                noti,
                update: setNoti
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export const useNotification = () => useContext(NotificationContext);
