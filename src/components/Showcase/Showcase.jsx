import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

import acImg1 from "../../assets/activities-1.png";
import acImg2 from "../../assets/activities-2.png";
import acImg3 from "../../assets/activities-3.png";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const containerRef = useRef(null);
    const imgConRef = useRef(null);

    useGSAP(() => {
        if (!imgConRef.current || !containerRef.current) return;

        // ✅ TARGET ONLY INNER IMAGES (NOT OUTER DIV)
        const images = gsap.utils.toArray(".image-item");

        const totalWidth =
            imgConRef.current.scrollWidth - containerRef.current.offsetWidth;

        let lastScroll = window.scrollY;
        let velocity = 0;

        // ✅ Horizontal scroll animation (unchanged)
        gsap.to(imgConRef.current, {
            x: () => -totalWidth,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "-10% 10%",
                end: () => `+=${totalWidth}`,
                scrub: true,
                pin: true,
                // invalidateOnRefresh: true,
                // markers: true,

                // onUpdate: () => {
                //     const currentScroll = window.scrollY;
                //     velocity = currentScroll - lastScroll;
                //     lastScroll = currentScroll;

                //     // ✅ Smooth limited movement (no gap, no break)
                //     const move = gsap.utils.clamp(
                //         -60,
                //         60,
                //         velocity * 2.2
                //     );

                //     images.forEach((img, index) => {
                //         gsap.to(img, {
                //             x: move * (index % 2 === 0 ? 1 : -1),
                //             duration: 0.4,
                //             ease: "power3.out",
                //             overwrite: "auto"
                //         });
                //     });
                // }
            }
        });
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className='relative w-full h-dvh overflow-hidden'
        >
            <div
                ref={imgConRef}
                className="absolute top-0 left-0 h-full flex items-center justify-start gap-2 p-2 overflow-hidden"
            >
                {/* Image 1 */}
                <div className="relative flex-shrink-0 w-[80vw] h-full overflow-hidden">
                    <div className="w-[77vw] absolute top-6 md:top-10 left-5 flex justify-between items-start text-white">
                        <h1 className="text-3xl md:text-5xl font-bold">Buggy tours<br /> in the desert</h1>
                    </div>
                    <img
                        src={acImg1}
                        alt="Activity 1"
                        className="image-item w-full h-full object-cover rounded-[2.5rem]"
                    />
                    <div className="w-[77vw] absolute bottom-6 md:bottom-10 left-5 flex justify-between items-start ">
                        <p className="text-[0.7rem] md:text-[0.9rem] font-bold text-white">Explore the terrain on a guided buggy tour that takes<br />you through the desert's vast and open landscapes.</p>
                        <div className="flex justify-center items-center">
                            <p className="text-white border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem] md:text-[0.9rem]">01</p>
                            <p className="text-white border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem] md:text-[0.9rem]">03</p>
                        </div>
                    </div>
                </div>

                {/* Image 2 */}
                <div className="relative flex-shrink-0 w-[80vw] h-full overflow-hidden">
                    <div className="w-[77vw] absolute top-6 md:top-10 left-5 flex justify-between items-start text-white">
                        <h1 className="text-3xl md:text-5xl font-bold">Breathtaking<br />desert hikes</h1>
                    </div>
                    <img
                        src={acImg2}
                        alt="Activity 2"
                        className="image-item w-full h-full object-cover rounded-[2.5rem]"
                    />
                    <div className="w-[77vw] absolute bottom-6 md:bottom-10 left-5 flex justify-between items-start ">
                        <p className="text-[0.7rem] md:text-[0.9rem] font-bold text-white">Follow winding trails across rugged canyons and high<br />ridges with panoramic views in every direction.</p>
                        <div className="flex justify-center items-center">
                            <p className="text-white border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem] md:text-[0.9rem]">02</p>
                            <p className="text-white border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem] md:text-[0.9rem]">03</p>
                        </div>
                    </div>
                </div>

                {/* Image 3 */}
                <div className="relative flex-shrink-0 w-[80vw] h-full overflow-hidden">
                    <div className="w-[77vw] absolute top-6 md:top-10 left-5 flex justify-between items-start text-white">
                        <h1 className="text-3xl md:text-5xl font-bold">Exciting<br /> rock climbing</h1>
                    </div>
                    <img
                        src={acImg3}
                        alt="Activity 3"
                        className="image-item w-full h-full object-cover rounded-[2.5rem]"
                    />
                    <div className="w-[77vw] absolute bottom-6 md:bottom-10 left-5 flex justify-between items-start ">
                        <p className="text-[0.7rem] md:text-[0.9rem] font-bold text-white">Test your limits on natural sandstone walls with expert<br />guides and breathtaking views from the top.</p>
                        <div className="flex justify-center items-center">
                            <p className="text-white border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem] md:text-[0.9rem]">03</p>
                            <p className="text-white border-[1px] rounded-3xl px-[1vw] py-1 text-center text-[0.7rem] md:text-[0.9rem]">03</p>
                        </div>
                    </div>
                </div>

                {/* Extra space */}
                {/* <div className="flex-shrink-0 w-[2%]"></div> */}
            </div>
        </section>
    );
};

export default Showcase;