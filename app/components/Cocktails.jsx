"use client"

import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { cocktailLists, mockTailLists } from '@/constants/layout'
import { useGSAP } from '@gsap/react'
import React from 'react'

const Cocktails = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#cocktails',
                start: 'top 30%',
                end: 'bottom 80%',
                scrub: true,
            }
        })

        parallaxTimeline.to("#c-left-leaf", {x: -100, y: 100}).from("#c-right-leaf", {x: 100, y: 100})
    })
  return (
    <section id='cocktails' className='noisy pr-4 pl-4'>
        <img src="/images/cocktail-left-leaf.png" alt="left-leaf" id='c-left-leaf' />
        <img src="/images/cocktail-right-leaf.png" alt="right-leaf" id='c-right-leaf' />

        <div className='list'>
           <div className='popular'>
            <h2>Most Popular Buzzlab Drinks</h2>
            <ul>
                {cocktailLists.map((drink)=>(
                    <li key={drink.name}>
                        <div className='md:me-28'>
                            <h3>{drink.name}</h3>
                            <p>{drink.country} | {drink.detail}</p>
                        </div>
                        <span>{drink.price}</span>
                    </li>
                ))}
            </ul>
           </div>

           <div className='loved'>
            <h2>Most Loved Buzzlab Drinks</h2>

            <ul>
                {mockTailLists.map((drink)=>(
                    <li key={drink.name}>
                        <div className='me-28'>
                            <h3>{drink.name}</h3>
                            <p>{drink.country} | {drink.detail}</p>
                        </div>
                        <span>{drink.price}</span>
                    </li>
                ))}
            </ul>
           </div>
        </div>
    </section>
  )
}

export default Cocktails
