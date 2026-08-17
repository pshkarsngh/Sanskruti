import { useRef } from "react";
import {
    FaLinkedinIn,
    FaInstagram,
    FaDribbble,
    FaBehance,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import menuImg from "../../assets/background1.png";
import smoke from "../../assets/smoke_final.mp4";
import "./menuoverlay.css";

const navLinks = [
    {
        id: "welcome",
        label: "Welcome",
        to: "/",
    },
    {
        id: "introduction",
        label: "Introduction",
        to: "/introduction",
    },
    {
        id: "houses",
        label: "Houses",
        to: "/houses",
    },
    {
        id: "why-capsules",
        label: (
            <>
                Why Sanskruti Design
                <br />
                Studio
            </>
        ),
        to: "/why-capsules",
    },
    {
        id: "activities",
        label: "Activities",
        to: "/activities",
    },
    {
        id: "feedback",
        label: "Feedback",
        to: "/feedback",
    },
];

const socials = [
    {
        icon: FaLinkedinIn,
        label: "LinkedIn",
    },
    {
        icon: FaInstagram,
        label: "Instagram",
    },
    {
        icon: FaDribbble,
        label: "Dribbble",
    },
    {
        icon: FaBehance,
        label: "Behance",
    },
];

const marqueeGroup =
    "Capsule    Capsule    Capsule    Capsule    ";

const MenuOverlay = ({
    buttonRef,
    closing,
    onClose,
    onCloseRequest,
}) => {
    const rootRef = useRef(null);
    const linksRef = useRef(null);

    // ----------------------------------------
    // GET BUTTON CLIP PATH
    // ----------------------------------------
    const getCapsuleClip = () => {
        const button = buttonRef?.current;

        if (!button) {
            return "inset(50% 50% 50% 50% round 9999px)";
        }

        const rect = button.getBoundingClientRect();

        const vw = window.innerWidth;
        const vh = window.innerHeight;

        return `inset(
            ${rect.top}px
            ${vw - rect.right}px
            ${vh - rect.bottom}px
            ${rect.left}px
            round 9999px
        )`;
    };

    // ----------------------------------------
    // OPEN ANIMATION
    // ----------------------------------------
    useGSAP(
        () => {
            if (!rootRef.current || !linksRef.current) {
                return;
            }

            const links = linksRef.current.children;

            gsap.set(rootRef.current, {
                clipPath: getCapsuleClip(),
            });

            gsap.set(links, {
                opacity: 0,
                y: 40,
            });

            const tl = gsap.timeline({
                delay: 0.05,
            });

            tl.to(rootRef.current, {
                clipPath: "inset(0% 0% 0% 0% round 0px)",
                duration: 1.05,
                ease: "power4.inOut",
            }).to(
                links,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.09,
                    ease: "power4.out",
                },
                ">-0.35"
            );
        },
        {
            scope: rootRef,
        }
    );

    // ----------------------------------------
    // CLOSE ANIMATION
    // ----------------------------------------
    useGSAP(
        () => {
            if (!closing) return;

            if (!rootRef.current || !linksRef.current) {
                return;
            }

            const links = linksRef.current.children;

            const tl = gsap.timeline();

            tl.to(links, {
                opacity: 0,
                y: 40,
                duration: 0.35,
                stagger: 0.04,
                ease: "power2.in",
            }).to(rootRef.current, {
                clipPath: getCapsuleClip(),
                duration: 0.9,
                ease: "power4.inOut",
                onComplete: onClose,
            });
        },
        {
            scope: rootRef,
            dependencies: [closing],
        }
    );

    return (
        <div
            ref={rootRef}
            className="
                fixed
                inset-0
                z-[100]
                bg-[#292725]
                overflow-hidden
            "
        >
            <div className="absolute inset-0 flex">

                {/* =========================
                    LEFT SECTION
                ========================== */}
                <div
                    className="
                        flex-1
                        flex
                        flex-col
                        justify-between
                        px-10
                        md:px-12
                        pt-10
                        md:pt-12
                        pb-9
                        md:pb-10
                    "
                >
                    {/* NAVIGATION */}
                    <nav
                        ref={linksRef}
                        className="flex flex-col"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                to={link.to}
                                onClick={onCloseRequest}
                                className="
                                    text-[clamp(2.8rem,5.6vw,7rem)]
                                    leading-[0.95]
                                    tracking-[-0.04em]
                                    font-light
                                    w-fit
                                    text-[#F4F1EB]
                                    transition-colors
                                    duration-300
                                    hover:text-white
                                "
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* SOCIALS */}
                    <div className="flex items-center gap-1.5">
                        {socials.map(
                            ({ icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href="#"
                                    aria-label={label}
                                    onClick={(e) =>
                                        e.preventDefault()
                                    }
                                    className="
                                        w-[clamp(3rem,3.1vw,3.7rem)]
                                        h-[clamp(3rem,3.1vw,3.7rem)]
                                        rounded-full
                                        border
                                        border-[#B7ADA0]/40
                                        flex
                                        items-center
                                        justify-center
                                        text-[#E7E0D6]
                                        transition-colors
                                        duration-300
                                        hover:border-white
                                        hover:text-white
                                    "
                                >
                                    <Icon className="text-lg" />
                                </a>
                            )
                        )}

                        <p
                            className="
                                hidden
                                lg:block
                                ml-6
                                text-[15px]
                                leading-[1.25]
                                font-light
                                text-[#B5AA9C]
                            "
                        >
                            This website is just the concept work
                            <br />
                            done by—Moyra to showcase our capabilities.
                        </p>
                    </div>
                </div>

                {/* =========================
                    RIGHT IMAGE
                ========================== */}
                <div
                    className="relative hidden lg:block"
                    style={{
                        width: "calc(150% - 52vw)",
                        minWidth: 560,
                        maxWidth: 720,
                        height: "100%",
                    }}
                >
                    <div
                        className="
                            absolute
                            overflow-hidden
                            rounded-[55px]
                        "
                        style={{
                            top: "8px",
                            right: "8px",
                            bottom: "10px",
                            width: "calc(75% - 80px)",
                        }}
                    >
                        {/* IMAGE */}
                        <img
                            src={menuImg}
                            alt="Capsule house in the desert"
                            className="
                                w-full
                                h-full
                                object-cover
                            "
                        />

                        {/* SMOKE */}
                        <video
                            src={smoke}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="
                                absolute
                                inset-0
                                w-full
                                h-full
                                object-cover
                                pointer-events-none
                                opacity-50
                                mix-blend-hard-light
                            "
                        />

                        {/* MARQUEE */}
                        <div
                            className="
                                absolute
                                top-1/2
                                -translate-y-1/2
                                left-0
                                w-full
                                overflow-hidden
                            "
                        >
                            <div
                                className="
                                    menu-marquee-track
                                    text-[clamp(8rem,14vw,17rem)]
                                    font-semibold
                                    text-[#F4F1EB]
                                    tracking-[-0.02em]
                                    leading-none
                                "
                            >
                                <span>{marqueeGroup}</span>

                                <span aria-hidden="true">
                                    {marqueeGroup}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuOverlay;