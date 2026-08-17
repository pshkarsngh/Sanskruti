import gsap from "gsap/all";
import smoke from "../../assets/smoke_final.mp4";
import mobileHeroBg from "../../assets/hero-mobile.png"
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const Hero = () => {

    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });


    useGSAP(() => {
        if (!isMobHero) {
            gsap.to(".hero-section .hero-img", {
                yPercent: "-5",
                stagger: 0.02,
                scale: 1.2,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1.5,
                    // markers: true
                }
            });
        };
    }, [isMobHero]);

    return (
        <section className="hero-section w-full md:w-dvw md:h-dvh min-h-[100svh] md:min-h-0 md:p-2 p-2.5 mb-20">
            <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                {/* Background image (down layer) - desktop */}
                <div className="hero-img absolute inset-0 bg-[url('./assets/background4.png')] bg-no-repeat bg-cover bg-center z-0 hidden md:block brightness-[0.7] opacity-90" />

                {/* Mobile image fallback */}
                <div className="md:hidden mt-6 mb-6">
                    <img
                        src={mobileHeroBg}
                        alt="mobile bg"
                        className="w-full rounded-[2rem] object-cover shadow-[0_-25px_45px_-10px_rgba(255,0,0,0.15)]"
                    />
                </div>

                {/* Smoke video (upper layer) */}
                <video
                    src={smoke}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none object-center opacity-50 mix-blend-hard-light rounded-[2rem]"
                ></video>

                <div className="relative z-20 flex flex-col md:h-full md:justify-center">
                    <div className="relative p-4 md:p-0 md:h-dvh">
                        <Link
                            to="/"
                            className="text-[#181717] md:text-white text-start text-[clamp(28px,8vw,44px)] md:text-[clamp(64px,7vw,120px)] leading-[0.82] font-normal tracking-[-0.06em] whitespace-nowrap md:absolute md:top-[10px] md:left-[18px] cursor-pointer inline-block"
                        >
                            Sanskruti Design <br /><span className="text-[0.8em]">Studio</span>
                        </Link>

                        <div className="w-full md:absolute md:bottom-[42px] mt-6 md:mt-0 flex md:flex-row flex-col md:justify-between md:items-end">
                            <h2
                                className="text-start lg:mt-0 text-[#6f6353] md:text-white text-[clamp(32px,2.6vw,48px)] font-medium tracking-[-0.035em] leading-[0.98] flex flex-col gap-1 md:pl-[18px]"
                            >
                                <span>Closer to</span>
                                <span>Nature—Closer</span>
                                <span>to Yourself</span>
                            </h2>

                            <p
                                className="md:max-w-[360px] w-[80%] text-[#181717] md:text-white text-[clamp(14px,1vw,18px)] font-medium tracking-[-0.02em] md:text-end mt-2 text-justify md:pr-[25px] md:mb-[23px]"
                            >
                                Spend unforgettable and remarkable time in the Californian desert with—Sanskruti Design Studio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
