import { Separator } from './ui/separator'
import React from 'react'
import TableHeader from './TableHeader'
const Table = () => {
  return (
    <div className='bg-white m-2'>
        <TableHeader />
        <Separator className='bg-gray-200 h-[1px] my-2' />
        <div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}

export default Table