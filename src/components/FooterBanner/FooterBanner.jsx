import { useRef, useState } from 'react';
import banner from '../../assets/background5.png';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ClickIndicator from '../MapLink/ClickIndicator';
import { Link } from 'react-router-dom';


const FooterBanner = () => {
    const [active, setActive] = useState(false);
    const fbConRef = useRef(null);
    const fbImgRef = useRef(null);

    useGSAP(() => {
        if (!fbConRef.current || !fbImgRef.current) return;

        gsap.fromTo(fbImgRef.current,
            {
                scale: 1.2, // Initial scale
            },
            {
                scale: 1, // Final scale
                ease: "none",
                scrollTrigger: {
                    trigger: fbConRef.current,
                    start: "top bottom-=20%",
                    end: "bottom top+=20%",
                    scrub: true,
                    // markers: true,
                }
            }
        );

    }, { scope: fbConRef });

    return (
        < div ref={fbConRef} className="w-screen h-dvh p-2 overflow-hidden" >
            <div className='w-full h-full relative overflow-hidden rounded-4xl'>
                <ClickIndicator active={active} />
                <img
                    onMouseEnter={() => setActive(true)}
                    onMouseLeave={() => setActive(false)}
                    ref={fbImgRef} src={banner} alt="" className='w-full h-full object-cover' />

                <Link to="/" className='absolute top-[30%] -translate-y-1/2 left-4 md:left-8 text-[5.5vw] font-bold text-white cursor-pointer'>Sanskruti Design <br/>Studio<sub className='text-[5vw]'></sub></Link>
                <div className='absolute bottom-5 px-4 w-full'>
                    <div className="w-full h-auto flex md:flex-row flex-col md:justify-between md:items-end">
                        <h2
                            className="text-start lg:mt-0 text-white text-2xl font-bold md:tracking-wider leading-5 flex flex-col gap-1"
                            style={{ textShadow: '2px 2px 4px #000' }}
                        >
                            <span>Closer to</span>
                            <span>Nature—Closer</span>
                            <span>to Yourself</span>
                        </h2>

                        <p
                            className="md:w-[20%] w-[80%] text-white text-[0.7rem] font-bold  md:font-medium tracking-wide lg:text-end mt-2 text-justify"
                            style={{ textShadow: '2px 2px 4px #000' }}
                        >
                            Spend unforgettable and remarkable time in the Californian desert with.
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FooterBanner