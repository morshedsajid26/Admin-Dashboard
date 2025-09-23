import React from 'react'
import Container from './component/Container'
import Image from 'next/image'
import users from '@/public/users.png'
import agents from '@/public/agents.png'
import income from '@/public/income.png'
import listings from '@/public/listings.png'

const page = () => {
  return (
    <div className='' >

    <Container className= 'grid grid-cols-4 grid-rows-2 gap-[18px]  '>
      
      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Total Users</p>
        <Image src={users}/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> 852,650</p>
      </div>

      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Total Agents</p>
        <Image src={agents}/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> 4,782</p>
      </div>

      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Total Income</p>
        <Image src={income}/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> $2,500</p>
      </div>

      <div className='bg-white rounded-[10px] flex flex-col justify-center items-center py-8 gap-[14px]'> 
        <p className='font-inter font-medium text-[20px] text-[#333333]'>Active listings</p>
        <Image src={listings}/>
        <p className='font-inter font-semibold text-[24px] text-[#333333]'> 358</p>
      </div>

      
      <div className='col-span-2 bg-white rounded-[5px]'>

        
      </div>



      <div className='col-span-2 bg-white rounded-[5px]'>1</div>
      <div className='col-span-4 bg-white rounded-[5px]'>1</div>
      


       
    </Container>
  
      
    </div>
  )
}

export default page
