"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { openingHours, socials } from "@/constants/layout";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const contactRef = useRef(null);
  const splitRef = useRef(null); // hold SplitType instance
  const ctxRef = useRef(null);   // hold gsap.context
  const initedRef = useRef(false);

  useEffect(() => {
    const el = contactRef.current;
    if (!el) return;

    // Safety: clean up any previous context (hot reload / re-mount)
    if (ctxRef.current) {
      try { ctxRef.current.revert(); } catch (e) {}
      ctxRef.current = null;
      try { ScrollTrigger.getAll().forEach(t => t.kill()); } catch (e) {}
      splitRef.current?.revert?.();
      splitRef.current = null;
      initedRef.current = false;
    }

    // Prevent double init (React StrictMode can mount twice)
    if (initedRef.current) return;
    initedRef.current = true;

    // Grab the heading element
    const heading = el.querySelector("h2");
    if (!heading) return;

    // If there was a previous split, revert it (safe-guard)
    try { splitRef.current?.revert?.(); } catch (e) {}

    // Create new SplitType (words)
    const split = new SplitType(heading, { types: "words" });
    splitRef.current = split;
    console.log("[Contact] split.words count:", split.words?.length);

    // Create GSAP context scoped to this element (safe cleanup)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top center",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power1.inOut" },
      });

      tl.from(split.words, {
        opacity: 0,
        yPercent: 100,
        stagger: 0.02,
        duration: 0.6,
      })
        .from(
          el.querySelectorAll("h3, p"),
          { opacity: 0, yPercent: 20, stagger: 0.04, duration: 0.6 },
          "-=0.35"
        )
        .to(el.querySelectorAll("#f-right-leaf"), { y: -50, duration: 1 }, "-=0.2")
        .to(el.querySelectorAll("#f-left-leaf"), { y: -50, duration: 1 }, "-=0.9");
    }, el);

    ctxRef.current = ctx;

    // Ensure ScrollTrigger recalculates after assets load / resize
    const refresh = () => {
      try { ScrollTrigger.refresh(); } catch (e) {}
    };
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    // cleanup on unmount
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);

      try { ctxRef.current?.revert(); } catch (e) {}
      try { splitRef.current?.revert(); } catch (e) {}

      ctxRef.current = null;
      splitRef.current = null;
      initedRef.current = false;

      try { ScrollTrigger.getAll().forEach(t => t.kill()); } catch (e) {}
    };
  }, []);

  return (
    <footer id="contact" ref={contactRef}>
      <img src="/images/footer-right-leaf.png" alt="leaf-right" id="f-right-leaf" />
      <img src="/images/footer-left-leaf.png" alt="leaf-left" id="f-left-leaf" />

      <div className="content">
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>7, Lok Kalyan Marg, New Delhi, India 110062</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>(+91) XXXXXXXXXX</p>
          <p>drink@gmail.com</p>
        </div>

        <div>
          <h3>Open Every Day</h3>
          {openingHours.map((time) => (
            <p key={time.day}>
              {time.day} : {time.time}
            </p>
          ))}
        </div>

        <div>
          <h3>Social Media Channels</h3>
          <div className="flex-center gap-5">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <img src={social.icon} alt={social.name} className="transition-all ease-in duration-300 hover:scale-150" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
