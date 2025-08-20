"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import VideoCarousel from './VideoCarousel'


const Highlights = () => {
    useGSAP(() => {
        gsap.to("#title", {
            opacity: 1,
            y: 0
        })
        gsap.to(".link", {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.25,
        })
    }, [])
  return (
    <section id='#highlight' className='w-screen overflow-hidden min-h-screen py-40 common-padding bg-gradient-to-br from-black to-purple-900/90'>
        <div className='screen-max-width'>
            {/* <div className='mb-12 w-full items-end justify-between md:flex'>
                <h1 id='title' className='section-heading'>Get the highlights.</h1>
                
                <div className='flex flex-wrap items-end gap-5'>
                    <p className='link'>
                        Watch the film
                        <img src="/play.svg" alt='watch' className='ml-2'/>
                    </p>
                    <p className='link'>
                        Watch the event
                        <img src="/replay.svg" alt='rightImg' className='ml-2'/>
                    </p>
                </div>
            </div> */}
            <VideoCarousel />
        </div>
    </section>
  )
}

export default Highlights