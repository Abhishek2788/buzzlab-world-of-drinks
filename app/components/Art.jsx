"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { featureLists, goodLists } from "@/constants/layout";


export default function Art() {
  const containerRef = useRef(null);
  const ctxRef = useRef(null); // store gsap.context
  const initedRef = useRef(false); // guard for init state
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If we have an old context, revert it first (safe re-init)
    if (ctxRef.current) {
      try {
        ctxRef.current.revert();
      } catch (e) {}
      ctxRef.current = null;
      // kill any stray triggers
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
      initedRef.current = false;
    }

    // Avoid double-init during odd lifecycle moments
    if (initedRef.current) return;

    // create new context scoped to this container
    const ctx = gsap.context(() => {
      const start = isMobile ? "top 20%" : "top top";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,              // use element ref (reliable)
          start,
          end: "bottom center",
          scrub: 1.5,
          pin: true,
        },
      });

      // Use querySelectors scoped to element (safer than global selectors)
      tl.to(el.querySelectorAll(".will-fade"), {
        opacity: 0,
        stagger: 0.2,
        ease: "power1.inOut",
      })
        .to(el.querySelectorAll(".masked-img"), {
          scale: 1.3,
          maskPosition: 'center',
          duration: 1,
          ease: "power1.inOut",
          maskSize: '400%'
        })
        .to(el.querySelectorAll("#masked-content"), {
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        });
    }, el);

    ctxRef.current = ctx;
    initedRef.current = true;

    // --- Make ScrollTrigger recalc when layout changes ---

    // Refresh when window load fires (images/fonts finished)
    const onWinLoad = () => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {}
    };
    window.addEventListener("load", onWinLoad);

    // Refresh on resize
    const onResize = () => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {}
    };
    window.addEventListener("resize", onResize);

    // Refresh when any image inside the container finishes loading
    const imgs = Array.from(el.querySelectorAll("img"));
    const imgsToListen = imgs.filter((i) => !i.complete);
    const onImgLoad = () => {
      try {
        ScrollTrigger.refresh();
      } catch (e) {}
    };
    imgsToListen.forEach((img) => img.addEventListener("load", onImgLoad));

    // Use ResizeObserver to catch layout changes inside container (e.g. fonts/images)
    let ro;
    try {
      ro = new ResizeObserver(() => {
        try {
          ScrollTrigger.refresh();
        } catch (e) {}
      });
      ro.observe(el);
    } catch (e) {
      // ResizeObserver might not exist in some envs — that's fine, it's a best-effort
    }

    // cleanup
    return () => {
      // remove listeners
      window.removeEventListener("load", onWinLoad);
      window.removeEventListener("resize", onResize);
      imgsToListen.forEach((img) => img.removeEventListener("load", onImgLoad));
      if (ro) ro.disconnect();

      // revert the gsap.context (kills timelines & scrolltriggers created in it)
      try {
        ctxRef.current?.revert();
      } catch (e) {}
      ctxRef.current = null;
      initedRef.current = false;

      // final safety: kill any remaining ScrollTriggers
      try {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
    };
  }, [isMobile]); // re-run when breakpoint changes so pin/start values re-calc

  return (
    <div id="art" ref={containerRef}>
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">Globe Bar</h2>

        <div className="content">
          <ul className="space-y-4 will-fade">
            {goodLists.map((feature, index) => (
              <li className="flex items-center gap-2" key={index}>
                <img src="/images/check.png" alt="check" />
                <p>{feature}</p>
              </li>
            ))}
          </ul>

          <div className="cocktail-img">
            <img
              src="/images/under-img.jpg"
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
            />
          </div>

          <ul className="space-y-4 will-fade">
            {featureLists.map((feature, index) => (
              <li
                className="flex items-center justify-start gap-2"
                key={index}
              >
                <img src="/images/check.png" alt="check" />
                <p className="md:w-fit w-60">{feature}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <h3>A little party never killed nobody, but a bad cocktail might.</h3>
            <p>
              This isn't just a drink. It's a carefully crafted moment made just
              for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
