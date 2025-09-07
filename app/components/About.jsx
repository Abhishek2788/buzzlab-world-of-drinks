"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const splitRef = useRef(null);

  useEffect(() => {
    const aboutEl = aboutRef.current;
    const titleEl = titleRef.current;
    if (!aboutEl || !titleEl) return;

    // prevent double init (React StrictMode)
    if (aboutEl.dataset.gsapInit) return;
    aboutEl.dataset.gsapInit = "1";

    // Split the title into words
    const split = new SplitType(titleEl, { types: "words" });
    splitRef.current = split;

    const ctx = gsap.context(() => {
      // ✅ Create a single timeline tied to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutEl,
          start: "top center",
          toggleActions: "play none none reverse",
        },
      });

      // animate title words
      tl.from(split.words, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 0.9,
        ease: "expo.out",
      });

      // animate top + bottom grids right after title
      tl.from(
        aboutEl.querySelectorAll(".top-grid > div, .bottom-grid > div"),
        {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3" // overlap a bit with previous
      );
    }, aboutEl);

    return () => {
      ctx.revert();
      splitRef.current?.revert();
      delete aboutEl.dataset.gsapInit;
    };
  }, []);

  return (
    <div id="about" ref={aboutRef} className="pt-[200px]">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Drinks</p>
            <h2 ref={titleRef}>
              Beer is proof that God loves us and wants us to be happy --- Benjamin Franklin
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Alcoholic drinks bring people together, offering a rich variety of flavors and traditions. From smooth spirits to refreshing cocktails, they enhance celebrations and create memorable moments worldwide with every sip.
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white">
                More than 10,000+ reviews on Google.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt1.png" alt="grid-img-1" />
        </div>
        <div className="md:col-span-6">
          <div className="noisy" />
          <img src="/images/abt2.png" alt="grid-img-2" />
        </div>
        <div className="md:col-span-3">
          <div className="noisy" />
          <img src="/images/abt5.png" alt="grid-img-3" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div className="noisy" />
          <img src="/images/abt3.png" alt="grid-img-4" />
        </div>
        <div className="md:col-span-4">
          <div className="noisy" />
          <img src="/images/abt4.png" alt="grid-img-5" />
        </div>
      </div>
    </div>
  );
}
