import { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ReservationPanel from "../Reservation/ReservationPanel";

const ReserveBtn = () => {
    const [open, setOpen] = useState(false);
    const [closing, setClosing] = useState(false);
    const [hidden, setHidden] = useState(false);

    const labelRef = useRef(null);

    // ----------------------------------------
    // HIDE ON SCROLL DOWN
    // ----------------------------------------
    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;

            if (y > lastY && y > 80) {
                setHidden(true);
            } else {
                setHidden(false);
            }

            lastY = y;
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // ----------------------------------------
    // HOVER ANIMATION (same as Menu)
    // ----------------------------------------
    const handleMouseEnter = () => {
        if (!labelRef.current) return;

        const text = labelRef.current;

        gsap.killTweensOf(text);

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

    const handleOpen = (e) => {
        e.preventDefault();

        if (open || closing) return;

        setOpen(true);
    };

    const handleClose = () => {
        if (!closing) {
            setClosing(true);
        }
    };

    const handleClosed = () => {
        setClosing(false);
        setOpen(false);
    };

    return (
        <>
            {/* RESERVATION PANEL */}
            {open && (
                <ReservationPanel
                    closing={closing}
                    onClose={handleClose}
                    onClosed={handleClosed}
                />
            )}

            {/* RESERVE BUTTON */}
            <div className={`fixed top-4 right-4 md:top-6 md:right-6 z-[49] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${hidden ? "-translate-y-[150%]" : "translate-y-0"}`}>
                <button
                    type="button"
                    onClick={handleOpen}
                    onMouseEnter={handleMouseEnter}
                    disabled={open || closing}
                    aria-label="Reserve"
                    className="
                        group
                        w-[165px]
                        h-[56px]
                        pl-7
                        pr-1.5
                        bg-[#181717]
                        rounded-full
                        flex
                        items-center
                        justify-between
                        text-[#F4EFE7]
                        cursor-pointer
                        transition-all
                        duration-300
                        hover:bg-[#181717]
                        disabled:cursor-default
                        disabled:opacity-100
                    "
                >
                    {/* SAME FLIP TEXT AS MENU */}
                    <div className="flex items-center justify-center overflow-hidden">
                        <span
                            ref={labelRef}
                            className="
                                inline-block
                                text-[14px]
                                font-medium
                                leading-none
                                tracking-[-0.02em]
                                [transform-style:preserve-3d]
                            "
                        >
                            Reserve
                        </span>
                    </div>

                    {/* ARROW CIRCLE */}
                    <span
                        className="
                            flex
                            items-center
                            justify-center
                            shrink-0
                            w-[48px]
                            h-[48px]
                            rounded-full
                            bg-[#E7DECD]
                            overflow-hidden
                            transition-transform
                            duration-300
                            group-hover:scale-[1.03]
                        "
                    >
                        <MdArrowOutward
                            className="
                                w-[27px]
                                h-[27px]
                                text-[#6F6353]
                                transition-transform
                                duration-500
                                ease-[cubic-bezier(0.16,1,0.3,1)]
                                group-hover:translate-x-[2px]
                                group-hover:-translate-y-[2px]
                            "
                        />
                    </span>
                </button>
            </div>
        </>
    );
};

export default ReserveBtn;