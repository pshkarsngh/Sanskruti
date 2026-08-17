import { useEffect, useRef, useState } from "react";

const MAP_URL =
    "https://maps.app.goo.gl/GRLcgmaRRZTg9TCL6?g_st=aw";

const MapCursor = ({ children, className = "" }) => {
    const sectionRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    const handleMouseEnter = () => {
        setVisible(true);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    };

    const handleMouseMove = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
    };

    const handleClick = (e) => {
        // Don't open the map if clicking a button/link
        if (e.target.closest("button, a")) {
            return;
        }

        window.open(MAP_URL, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            <section
                ref={sectionRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                className={`
                    relative
                    cursor-none
                    ${className}
                `}
            >
                {children}
            </section>

            {/* CUSTOM MAP CURSOR */}
            <div
                className={`
                    fixed
                    pointer-events-none
                    z-[9999]

                    flex
                    items-center
                    justify-center

                    w-[130px]
                    h-[52px]

                    rounded-full

                    bg-[#F4F0E8]
                    text-[#292725]

                    shadow-lg

                    transition-opacity
                    duration-200

                    ${visible ? "opacity-100" : "opacity-0"}
                `}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: "translate(-50%, -50%)",
                }}
            >
                <span className="text-[14px] font-medium tracking-[-0.02em]">
                    Show Map
                </span>

                <span
                    className="
                        ml-3
                        w-[36px]
                        h-[36px]
                        rounded-full
                        bg-[#292725]
                        text-[#F4F0E8]

                        flex
                        items-center
                        justify-center
                    "
                >
                    ↗
                </span>
            </div>
        </>
    );
};

export default MapCursor;