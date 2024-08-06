import React from 'react'

export default function Footer() {
  return (
    <footer className='container pt-2 pb-[25px]'>
        <div className=' flex items-baseline content-between flex-wrap'>
            <div className='text-[.875rem] leading-5 font-normal text-[#808e9d] mb-1'>
                <span>Powered by</span>
                <a href='http://localhost:3000/' rel="noopener noreferrer" title='Testportal' target='_blank' className='footer-logo ml-3'></a>
            </div>
        </div>
    </footer>
  )
}
