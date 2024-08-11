import React from 'react'

export default function Footer() {
  return (
    <div className='container 2xl:pl-[200px] 2xl:pr-[200px] w-full pt-2 pb-[25px] mx-auto px-6 box-border'>
        <div className=' flex items-baseline content-between flex-wrap justify-starts'>
            <div className='text-[.875rem] leading-5 font-normal text-[#808e9d] mb-1'>
                <span>Powered by</span>
                <a href='http://localhost:3000/' rel="noopener noreferrer" title='Testportal' target='_blank' className='footer-logo ml-3'></a>
            </div>
        </div>
    </div>
  )
}
