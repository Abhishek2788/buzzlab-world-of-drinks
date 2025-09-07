// "use client"

// import gsap from 'gsap';
// import { useGSAP } from '@gsap/react';
// import React, { useRef } from 'react';
// import { SplitText } from 'gsap/all';
// import { useMediaQuery } from 'react-responsive';

// const Hero = () => {
//     const videoRef = useRef();
//     const isMobile = useMediaQuery({ maxWidth: 767});

//     const startValue = isMobile ? 'top 50%' : 'center 60%';
//     const endValue = isMobile ? '120% top' : 'bottom top';

//     const videoTimeline = gsap.timeline({
//         scrollTrigger: {
//             trigger: 'video',
//             start: startValue,
//             end: endValue,
//             scrub: true,
//             pin: true,
//         }
//     });
//     videoRef.current.onloadedmetadata = () => {
//         videoTimeline.to(videoRef.current, {
//             currentTime: videoRef.current.duration,
//         })
//     }


//     useGSAP(()=>{
//         const heroSplit = new SplitText('.title', {type: 'chars words'});
//         const paragraphSplit = new SplitText('.subtitle', {type: 'lines'});

//         heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

//         gsap.from(heroSplit.chars, {
//             yPercent: 100,
//             duration: 1.8,
//             ease: 'expo.out',
//             stagger: 0.05,
//         });
//         gsap.from(paragraphSplit.lines, {
//             opacity: 0,
//             yPercent: 100,
//             duration: 1.8,
//             ease: 'expo-out',
//             stagger: 0.05,
//             delay: 1,
//         });

//         gsap.timeline({
//             scrollTrigger: {
//                 trigger: '#hero',
//                 start: 'top top',
//                 end: 'bottom top',
//                 scrub: true,
//             }
//         })
//         .to('.right-leaf', { y: 200}, 0)
//         .to('.left-leaf', { y: 200 }, 0)

//     })
//   return (
//     <>
//         <section id='hero' className='noisy'>
//             <h1 className='title'>MOJITO</h1>
//             <img src="/images/hero-left-leaf.png" alt="left-leaf" className='left-leaf' />
//             <img src="/images/hero-right-leaf.png" alt="right-leaf" className='right-leaf' />
//             <div className='body'>
//                 <div className='content'>
//                     <div className='space-y-5 hidden md:block'>
//                         <p>Cool. Crisp. Classic.</p>
//                         <p className='subtitle'>Sip the spirit <br /> of summer.</p>
//                     </div>

//                     <div className='view-cocktails'>
//                         <p className='subtitle'>
//                             Every cocktail is a masterpiece, crafted with passion and precision. Experience the art of mixology with us. It is not just a drink, it's an experience.
//                         </p>
//                         <a href="#cocktails">
//                             View cocktails
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </section>

//         <div className='video absolute inset-0'>
//             <video src="/videos/input.mp4" ref={videoRef} muted playsInline preload='auto'></video>
//         </div>
//     </>
//   )
// }

// export default Hero



"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import React, { useRef, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const videoS = videoRef.current;
    if (!videoS) return;

    // Always reset video on mount
    videoS.pause();
    videoS.currentTime = 0;

    const startValue = isMobile ? "top 50%" : "center 60%";
    const endValue = isMobile ? "155% top" : "bottom top";

    const initTimeline = () => {
      // Reset before GSAP controls it
      videoS.pause();
      videoS.currentTime = 0;

      // Kill any old timeline (important on refresh/navigation)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      gsap.timeline({
        scrollTrigger: {
          trigger: videoS,
          start: startValue,
          end: endValue,
          scrub: true,
          pin: true,
        },
      }).to(videoS, {
        currentTime: videoS.duration,
        ease: "none",
      });
    };

    if (videoS.readyState >= 1) {
      // Metadata already loaded (cached)
      initTimeline();
    } else {
      videoS.addEventListener("loadedmetadata", initTimeline);
    }

    return () => {
      videoS.removeEventListener("loadedmetadata", initTimeline);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  useGSAP(() => {
    // Split text and animate
    const heroSplit = new SplitText(".title", { type: "chars words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) =>
      char.classList.add("text-gradient")
    );

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
    });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.05,
      delay: 1,
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: 200 }, 0);

    return () => {
      heroSplit.revert();
      paragraphSplit.revert();
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">BUZZLAB</h1>
        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />
        <img
          src="/images/hero-right-leaf.png"
          alt="right-leaf"
          className="right-leaf"
        />
        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Age and glasses of <br/> wine should never be counted
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Discover a world of exquisite alcoholic beverages, from classic spirits to innovative cocktails. Explore rich histories, diverse flavors, and expert guides to enhance every social occasion and celebration.
              </p>
              <a href="#cocktails">View Buzzlab</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          src="/videos/input.mp4"
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          autoPlay
        ></video>
      </div>
    </>
  );
};

export default Hero;
