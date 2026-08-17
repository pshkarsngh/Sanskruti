import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

import "./footertitle.css";

gsap.registerPlugin(SplitText, ScrollTrigger);

const FooterTitle = () => {
    const ftConRef = useRef(null);

    useGSAP(() => {
        if (!ftConRef.current) return;

        // Get the original HTML before splitting
        const originalHTML = ftConRef.current.querySelector(".footer-title h1").innerHTML;

        // Create split - exclude the sub element from being split
        const split = new SplitText(".footer-title h1", {
            type: "chars",
            charsClass: "ftChar",
            // Exclude the <sub> element from being split
            exclude: "sub"
        });

        // Wrap each character in a span for animation
        split.chars.forEach(char => {
            char.innerHTML = `<span>${char.innerHTML}</span>`;
        });

        const innerChars = split.chars.map(c => c.querySelector("span"));

        // Handle the sub element separately
        const sub = ftConRef.current.querySelector(".footer-title sub");
        if (sub) {
            sub.innerHTML = `<span>${sub.innerHTML}</span>`;
            const subSpan = sub.querySelector("span");

            // Add to innerChars array
            innerChars.push(subSpan);
        }

        // Initial state - start from left (-120%)
        gsap.set(innerChars, { x: "-120%" });

        // Animation - move to normal position
        gsap.to(innerChars, {
            x: "0%",
            stagger: 0.02, // Add stagger for character-by-character reveal
            ease: "power3.out",
            scrollTrigger: {
                trigger: ftConRef.current,
                start: "top 90%",
                end: "top 80%",
                scrub: true,
                // markers: true
            }
        });

        // Cleanup - revert the split and restore original HTML
        return () => {
            split.revert();
            // Restore the original HTML with sub element
            ftConRef.current.querySelector(".footer-title h1").innerHTML = originalHTML;
        };

    }, { scope: ftConRef });

    return (
        <section ref={ftConRef} className='relative z-1 w-screen h-[40vh] border-1 border-t-[#8a7f6d]'>
            <div className='w-full flex flex-col md:flex-row justify-between items-center px-6 mt-8 gap-2'>
                <p className='text-[#6f6353] text-[0.7rem]'>
                    Lorem ipsum—<a href="#" className='text-[#2b2825]'>dolor sit</a>
                </p>
                <p className='text-[#6f6353] text-[0.7rem]'>
                    Lorem ipsum <a href="#" className='text-[#2b2825]'>dolor sit amet</a>
                </p>
                <p className='text-[#6f6353] text-[0.7rem]'>
                    All rights reserved © <a href="#" className='text-[#2b2825]'>2026</a>
                </p>
            </div>

            <div className='footer-title w-full text-center'>
                <Link to="/" className='block'>
                    <h1 className='text-[10vw] font-bold whitespace-nowrap'>
                        Sanskruti Design <span className="studio-text text-[0.6em]">Studio</span><sub></sub>
                    </h1>
                </Link>
            </div>
        </section>
    );
};

export default FooterTitle;