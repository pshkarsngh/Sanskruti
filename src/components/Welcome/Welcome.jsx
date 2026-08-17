import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import w1 from "../../assets/welcome-1.png"
import w2 from "../../assets/welcome-2.png"

const Welcome = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".clip-text-welcome");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".welcome-section",
                start: "top 75%",
                end: "bottom 75%",
                scrub: true,
                // markers: true
            },
        });

        lines.forEach((line) => {
            tl.to(line, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.2,
                duration: 1,
            });
        });

    });

    return (
        <div className='welcome-section w-full min-h-[120vh] h-auto text-[#e7decd] md:h-[120vh] md:min-h-0 md:px-7 px-5 md:py-0 pt-10 pb-10'>
            <div className='flex flex-col gap-2 tracking-[-4] leading-2'>
                <div className="w-full md:w-[86%] text-[30px] md:text-[52px] lg:text-[64px] welcome-line md:pt-20">
                    <div className="w-full welcome-text flex flex-col justify-center items-start">
                        {welcomeLines.map((text, index) => (
                            <span key={index} className="relative block text-darkBrown md:tracking-[-0.010em] tracking-[0.015em]">
                                {text}
                                <span className="clip-text-welcome md:tracking-[-0.010em] tracking-[0.015em]">{text}</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex md:flex-row flex-col justify-between items-center md:p-4 md:mt-20 mt-10">
                <div className="flex flex-row justify-center items-center gap-1">
                    <img src={w1} alt="welcome image" className="md:rounded-[8rem] rounded-[9rem] md:w-80 w-60" />
                    <img src={w2} alt="welcome image" className="md:rounded-[8rem] rounded-[9rem] md:w-80 w-60" />
                </div>
                <div className="md:w-1/2 w-full md:mt-0 mt-10">
                    <p className="md:text-[2.6rem] text-[2rem] text-[#6f6353] md:leading-[1.1] md:pr-24 font-normal leading-[26px] tracking-[-0.2px]">
                        <span>A place where you can be with yourself and your loved ones.</span><br />
                        <span>A place where you can experience unforgettable desert things.</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;