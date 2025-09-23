import React from 'react'

const Li = ({href,liText,children, className,icon}) => {
  return (
    <li className={`font-inter font-medium text-[16px] hover:text-[#FEFEFE] hover:bg-[#015093] py-3 pr-[14px] transition-all duration-300 cursor-pointer pl-[31px] rounded-r-[5px] ${className}`}>
        <a href={href} className='flex items-center gap-2.5'>
            {icon}
            {liText}
        </a>
        {children}
    </li>
  )
}

export default Li
