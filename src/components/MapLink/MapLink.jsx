import { useState } from "react";
import ClickIndicator from "./ClickIndicator";

const MapLink = () => {
    const [active, setActive] = useState(false);

    return (
        <section className="w-screen min-h-[90vh] h-auto md:h-[90vh] bg-[#f4efe7] flex flex-col justify-center items-center text-center px-4">
            <div>
                <p className="text-[0.7rem] font-bold text-[#6a6155] choose-subtitle">
                    Lorem ipsum dolor sit amet
                </p>

                <h1 className="text-[7vw] md:text-[5vw] leading-[1.15] md:leading-15 tracking-tight mt-5 text-[#181717]">
                    Lorem ipsum dolor sit<br />
                    amet, consectetur adipiscing<br />
                </h1>
            </div>

            <ClickIndicator active={active} />

            <a
                href="#"
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                className="text-[#6f6353] text-[7vw] md:text-[5vw] underline hover:text-[#181717]"
            >
                elit, sed do eiusmod tempor.
            </a>
        </section>
    );
};

export default MapLink;