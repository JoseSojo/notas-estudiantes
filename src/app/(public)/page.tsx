"use client";

import Link from "next/link";

export default function Home() {

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-5 lg:p-7 gap-5'>

      <Link href='/lapso/1'>
        <div className='bg-gray-100 shadow-gray-300 hover:bg-emerald-400 duration-200 rounded-lg py-5'>
          <p className='font-bold text-md text-center text-gray-700'>Notas Primer Lapso</p>
        </div>
      </Link>

      <Link href='/lapso/2'>
        <div className='bg-gray-100 shadow-gray-300 hover:bg-emerald-400 duration-200 rounded-lg py-5'>
          <p className='font-bold text-md text-center text-gray-700'>Notas Segundo Lapso</p>
        </div>
      </Link>

      <Link href='/lapso/3'>
        <div className='bg-gray-100 shadow-gray-300 hover:bg-emerald-400 duration-200 rounded-lg py-5'>
          <p className='font-bold text-md text-center text-gray-700'>Notas Tercer Lapso</p>
        </div>
      </Link>

      <Link href='/def'>
        <div className='bg-gray-100 shadow-gray-300 hover:bg-emerald-400 duration-200 rounded-lg py-5'>
          <p className='font-bold text-md text-center text-gray-700'>Notas Definitivas</p>
        </div>
      </Link>

    </div>
  );
}
