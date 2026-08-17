import { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import MenuOverlay from "./MenuOverlay";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [label, setLabel] = useState("Menu");

    const buttonRef = useRef(null);
    const labelRef = useRef(null);

    const menuIconRef = useRef(null);
    const closeIconRef = useRef(null);

    // ----------------------------------------
    // CLICK ANIMATION
    // ----------------------------------------
    useGSAP(
        () => {
            if (!labelRef.current) return;

            const text = labelRef.current;

            // Menu -> Close
            if (open) {
                gsap.timeline()
                    .to(text, {
                        y: -18,
                        rotateX: -90,
                        opacity: 0,
                        duration: 0.25,
                        ease: "power3.in",
                    })
                    .call(() => {
                        setLabel("Close");
                    })
                    .fromTo(
                        text,
                        {
                            y: 18,
                            rotateX: 90,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            duration: 0.4,
                            ease: "power3.out",
                        }
                    );

                // Hamburger -> Close
                gsap.to(menuIconRef.current, {
                    opacity: 0,
                    rotate: 90,
                    scale: 0.5,
                    duration: 0.3,
                    ease: "power3.inOut",
                });

                gsap.to(closeIconRef.current, {
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 0.45,
                    delay: 0.08,
                    ease: "back.out(1.7)",
                });
            } else {
                // Close -> Menu
                gsap.timeline()
                    .to(text, {
                        y: -18,
                        rotateX: -90,
                        opacity: 0,
                        duration: 0.25,
                        ease: "power3.in",
                    })
                    .call(() => {
                        setLabel("Menu");
                    })
                    .fromTo(
                        text,
                        {
                            y: 18,
                            rotateX: 90,
                            opacity: 0,
                        },
                        {
                            y: 0,
                            rotateX: 0,
                            opacity: 1,
                            duration: 0.4,
                            ease: "power3.out",
                        }
                    );

                // Close -> Hamburger
                gsap.to(closeIconRef.current, {
                    opacity: 0,
                    rotate: -90,
                    scale: 0.5,
                    duration: 0.3,
                    ease: "power3.inOut",
                });

                gsap.to(menuIconRef.current, {
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 0.45,
                    delay: 0.08,
                    ease: "back.out(1.7)",
                });
            }
        },
        {
            dependencies: [open],
        }
    );

    // ----------------------------------------
    // HOVER ANIMATION
    // ----------------------------------------
    const handleMouseEnter = () => {
        if (!labelRef.current) return;

        const text = labelRef.current;

        // Stop anything currently happening
        gsap.killTweensOf(text);

        // Current word goes up/rotates
        gsap.timeline()
            .to(text, {
                y: -16,
                rotateX: -90,
                opacity: 0,
                duration: 0.22,
                ease: "power3.in",
            })
            .set(text, {
                y: 16,
                rotateX: 90,
            })
            .to(text, {
                y: 0,
                rotateX: 0,
                opacity: 1,
                duration: 0.38,
                ease: "power3.out",
            });
    };

    // ----------------------------------------
    // MENU TOGGLE
    // ----------------------------------------
    const handleToggle = (e) => {
        e.preventDefault();

        if (closing) return;

        if (open) {
            setClosing(true);
        } else {
            setOpen(true);
        }
    };

    // ----------------------------------------
    // CLOSE FROM LINK
    // ----------------------------------------
    const handleCloseRequest = () => {
        if (!closing) {
            setClosing(true);
        }
    };

    // ----------------------------------------
    // OVERLAY FINISHED
    // ----------------------------------------
    const handleCloseFinished = () => {
        setClosing(false);
        setOpen(false);
    };

    // ----------------------------------------
    // SCROLL LOCK
    // ----------------------------------------
    useEffect(() => {
        const smoother = window.__scrollSmoother;

        if (open) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";

            smoother?.paused(true);
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            smoother?.paused(false);
        }

        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";

            smoother?.paused(false);
        };
    }, [open]);

    return (
        <>
            {open && (
                <MenuOverlay
                    buttonRef={buttonRef}
                    closing={closing}
                    onClose={handleCloseFinished}
                    onCloseRequest={handleCloseRequest}
                />
            )}

            <button
                ref={buttonRef}
                type="button"
                onClick={handleToggle}
                onMouseEnter={handleMouseEnter}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="menu-button"
            >
                {/* TEXT */}
                <span className="menu-button-text">
                    <span
                        ref={labelRef}
                        className="menu-button-label"
                    >
                        {label}
                    </span>
                </span>

                {/* CIRCLE */}
                <span className="menu-button-circle">
                    {/* HAMBURGER */}
                    <IoMdMenu
                        ref={menuIconRef}
                        className="menu-icon"
                    />

                    {/* CLOSE */}
                    <IoMdClose
                        ref={closeIconRef}
                        className="close-icon"
                    />
                </span>
            </button>
        </>
    );
};

export default Navbar;