"use client";

import Link from "next/link";
import { FC } from "react";

interface Props {
    to: string,
    text: string
}

export const ButtonNav: FC<Props> = ({ to, text }) => {

    return (
        <Link href={to}>
            <button 
                className="value"
            >
                {text}
            </button>
        </Link>
    )
}
