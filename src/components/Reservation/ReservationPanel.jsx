import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { IoMdClose } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import cap1 from "../../assets/cap1-square.jpg";
import cap2 from "../../assets/cap2-square.jpg";
import cap3 from "../../assets/cap3-square.jpg";
import heroCap from "../../assets/cap1.png";

const capsules = [
    { name: "Classic C®", img: cap1, price: 2400 },
    { name: "Terrace C®", img: cap2, price: 3000 },
    { name: "Desert C®", img: cap3, price: 3600 },
];

const ReservationPanel = ({ closing, onClose, onClosed }) => {
    const rootRef = useRef(null);
    const overlayRef = useRef(null);
    const panelRef = useRef(null);
    const formRef = useRef(null);
    const thankyouRef = useRef(null);
    const [selected, setSelected] = useState(0);
    const [startDate, setStartDate] = useState("2026-08-17");
    const [endDate, setEndDate] = useState("2026-08-22");
    const [step, setStep] = useState("form");

    const nights =
        startDate && endDate
            ? Math.round((new Date(endDate) - new Date(startDate)) / 86400000)
            : 0;
    const cost = (nights > 0 ? nights : 0) * capsules[selected].price;

    const formatDate = (iso) => {
        if (!iso) return "--.--";
        const [y, m, d] = iso.split("-");
        return `${d}.${m}`;
    };

    useGSAP(() => {
        gsap.set(overlayRef.current, { opacity: 0 });
        gsap.set(panelRef.current, { x: "100%" });

        const tl = gsap.timeline();
        tl.to(overlayRef.current, { opacity: 0.65, duration: 0.6, ease: "power2.out" })
            .to(panelRef.current, { x: "0%", duration: 0.9, ease: "power4.inOut" }, "<")
            .fromTo(
                ".rp-block",
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" },
                "-=0.45"
            );
    }, { scope: rootRef });

    useEffect(() => {
        if (step !== "thankyou") return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                thankyouRef.current,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, duration: 0.6, ease: "power3.inOut" }
            );
        }, rootRef);

        return () => ctx.revert();
    }, [step]);

    const handleNext = () => {
        if (step !== "form") return;
        gsap.to(formRef.current, {
            opacity: 0,
            x: -40,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => setStep("thankyou"),
        });
    };

    useEffect(() => {
        if (!closing) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ onComplete: onClosed });
            tl.to(".rp-block", {
                opacity: 0,
                y: 24,
                duration: 0.3,
                stagger: 0.03,
                ease: "power2.in",
            })
                .to(panelRef.current, { x: "100%", duration: 0.7, ease: "power4.inOut" }, "-=0.1")
                .to(overlayRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" }, "<");
        }, rootRef);

        return () => ctx.revert();
    }, [closing]);

    return (
        <div ref={rootRef} className="fixed inset-0 z-[300]">
            <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0"></div>

            <div
                ref={panelRef}
                className="reservation-panel w-full md:w-[450px] lg:w-[540px] bg-[#292725] rounded-[30px_0_0_30px] md:rounded-[45px_0_0_45px] overflow-hidden"
            >
                <button
                    onClick={onClose}
                    className="absolute top-[35px] left-[35px] z-10 w-[50px] h-[50px] rounded-full bg-[#181818] flex items-center justify-center cursor-pointer transition-colors duration-300 hover:bg-[#242321]"
                >
                    <IoMdClose className="text-[#f4efe7] text-2xl" />
                </button>

                <div className="h-full overflow-y-auto px-[38px] pt-[110px] pb-6 flex flex-col">
                    {step === "form" ? (
                        <div ref={formRef} className="flex flex-col flex-1">
                            <h2 className="rp-block text-[2.5rem] leading-[1.02] tracking-[-0.02em] font-semibold text-[#F4F1EB]">
                                Make it memorable
                                <br />
                                and reserve one of
                                <br />
                                our— Sanskruti Design <span className="text-[0.6em]">Studio</span> 
                            </h2>

                            <p className="rp-block mt-5 text-[16px] leading-[1.35] font-normal text-[#B5AA9C] max-w-[420px]">
                                Ready to start your journey to a desert adventure? Secure your capsule by filling out the reservation form.We hope to see you soon!
                            </p>

                            <div className="rp-block mt-8">
                                <p className="text-[16px] font-semibold text-white">
                                    (1) Which capsule you would like to reserve?
                                </p>
                                <div className="mt-4 flex gap-2.5 overflow-x-auto md:overflow-visible">
                                    {capsules.map((c, i) => (
                                        <button
                                            key={c.name}
                                            onClick={() => setSelected(i)}
                                            className={`flex-1 min-w-[120px] flex flex-col rounded-2xl overflow-hidden transition-colors duration-300 cursor-pointer ${
                                                selected === i ? "bg-[#F4F0E8]" : "bg-[#181818]"
                                            }`}
                                        >
                                            <div className="h-[100px] overflow-hidden">
                                                <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div
                                                className={`px-3 py-3 text-[13px] md:text-sm font-medium text-left transition-colors duration-300 ${
                                                    selected === i ? "text-[#292725]" : "text-[#F4F1EB]"
                                                }`}
                                            >
                                                {c.name}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="rp-block mt-8">
                                <p className="text-[16px] font-semibold text-white">
                                    (2) How long you would like to stay and when?
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="flex-1 flex items-center gap-3 border-b border-[#B7ADA0]/40 pb-2">
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="bg-transparent text-[#E7E0D6] text-[15px] w-full outline-none [color-scheme:dark]"
                                        />
                                        <FaCalendarAlt className="text-[#B7ADA0] shrink-0" />
                                    </div>
                                    <span className="text-[#B7ADA0]">—</span>
                                    <div className="flex-1 flex items-center gap-3 border-b border-[#B7ADA0]/40 pb-2">
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="bg-transparent text-[#E7E0D6] text-[15px] w-full outline-none [color-scheme:dark]"
                                        />
                                        <FaCalendarAlt className="text-[#B7ADA0] shrink-0" />
                                    </div>
                                </div>
                            </div>

                            <div className="rp-block mt-auto pt-8">
                                <div className="flex items-center gap-4 bg-[#181818] rounded-full h-[100px] pl-6 pr-2.5">
                                    <div className="flex-1 flex items-center">
                                        <div className="flex-1">
                                            <p className="text-[12px] text-[#B5AA9C]">Stay</p>
                                            <p className="text-[17px] font-medium text-[#F4F1EB]">
                                                {formatDate(startDate)} – {formatDate(endDate)}
                                            </p>
                                        </div>
                                        <div className="h-12 w-px bg-[#3a3836] mx-5"></div>
                                        <div className="flex-1">
                                            <p className="text-[12px] text-[#B5AA9C]">Cost</p>
                                            <p className="text-[17px] font-medium text-[#F4F1EB]">
                                                {nights > 0 ? cost : 0} INR
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        className="shrink-0 flex items-center justify-between h-[60px] w-[140px] pl-6 pr-1.5 bg-[#F4F0E8] rounded-full cursor-pointer group"
                                    >
                                        <span className="text-[16px] font-medium text-[#292725]">Next</span>
                                        <span className="w-[50px] h-[50px] rounded-full bg-[#181818] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#1f1d1b]">
                                            <MdArrowOutward className="text-[#f4efe7] text-xl" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div ref={thankyouRef} className="flex flex-col flex-1">
                            <h2 className="text-[2.375rem] leading-[1.05] tracking-[-0.02em] font-medium text-[#F4F1EB]">
                                Thank you for your
                                <br />
                                interest—but you can't
                                <br />
                                go further :(
                            </h2>

                            <p className="mt-6 text-[16px] leading-[1.45] font-normal text-[#B5AA9C]">
                                This website is just the concept work
                                <br />
                                done by  student —a premium digital lab. If you
                                <br />
                                like this project and would like to outsource
                                <br />
                                something similar, don't hesitate to contact
                                <br />
                                us. Click the below button or use our email:{" "}
                                <a href="mailto:sanskrutidesignstudio@gmail.com" className="underline decoration-[#B5AA9C] hover:text-[#F4F1EB]">
                                    email
                                </a>
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="https://wa.me/919663665570"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between h-[64px] w-[200px] pl-6 pr-1.5 bg-[#F4F0E8] rounded-full cursor-pointer group"
                                >
                                    <span className="text-[16px] font-medium text-[#292725]">WhatsApp</span>
                                    <span className="w-[50px] h-[50px] rounded-full bg-[#292725] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#1f1d1b]">
                                        <MdArrowOutward className="text-[#F4F0E8] text-xl" />
                                    </span>
                                </a>
                                <a
                                    href="https://maps.app.goo.gl/GRLcgmaRRZTg9TCL6?g_st=aw"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between h-[64px] w-[155px] pl-6 pr-1.5 bg-[#F4F0E8] rounded-full cursor-pointer group"
                                >
                                    <span className="text-[16px] font-medium text-[#292725]">Location</span>
                                    <span className="w-[50px] h-[50px] rounded-full bg-[#292725] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#1f1d1b]">
                                        <MdArrowOutward className="text-[#F4F0E8] text-xl" />
                                    </span>
                                </a>
                            </div>

                            <div className="mt-auto pt-10">
                                <div className="relative rounded-[45px] overflow-hidden h-[320px]">
                                    <img src={heroCap} alt="Capsules in the desert" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 flex items-end justify-center pb-4">
                                        <span className="text-[#F4F1EB] text-[3.5rem] font-semibold tracking-[-0.02em] leading-none">
                                            Sanskruti Design <br/>Studio
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReservationPanel;
