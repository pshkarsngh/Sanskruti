import { FaBehance } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaDribbble } from "react-icons/fa";
import { Link } from "react-router-dom";

import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-screen min-h-dvh h-auto md:h-dvh px-6 mt-10'>
            <p className='text-[.7rem] text-[#6a6155] choose-subtitle mt-10'>Interested in an amazing adventure?<br />Reserve one of our Capsules<span>®</span></p>
            <div>
                <MarqueeText />
            </div>

            <div className='flex flex-col md:flex-row justify-between items-start md:items-center text-2xl mt-14 gap-8'>
                <h3 className='text-[#6f6353]'>This website is just the concept<br />
                    work done by—Moyra to showcase<br />
                    our capabilities.<br /><br />
                    If you would like to outsource a similar<br />
                    website project—<a href="#" className='text-[#181717] hover:text-[#8a7f6d] underline'> contact us.</a>
                </h3>

                <div className='flex flex-col justify-center items-start md:items-end'>
                    <Link to="/" className='text-[#2b2825] text-2xl'>Welcome</Link>
                    <Link to="/introduction" className='text-[#2b2825] text-2xl'>Introduction</Link>
                    <Link to="/houses" className='text-[#2b2825] text-2xl'>Houses</Link>
                    <Link to="/why-capsules" className='text-[#2b2825] text-2xl'>Why Sanskruti Design<br />Studio</Link>
                    <Link to="/activities" className='text-[#2b2825] text-2xl'>Activities</Link>
                    <Link to="/feedback" className='text-[#2b2825] text-2xl'>Feedback</Link>
                </div>
            </div>

            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 mt-20">
                <div className="flex justify-center items-center gap-1">
                    <div className='border-[1px] border-[#8a7f6d] rounded-full p-3 text-[#2b2825]'><FaBehance className="text-xl" /></div>
                    <div className='border-[1px] border-[#8a7f6d] rounded-full p-3 text-[#2b2825]'><FaInstagram className="text-xl" /></div>
                    <div className='border-[1px] border-[#8a7f6d] rounded-full p-3 text-[#2b2825]'><CiLinkedin className="text-xl" /></div>
                    <div className='border-[1px] border-[#8a7f6d] rounded-full p-3 text-[#2b2825]'><FaDribbble className="text-xl" /></div>
                </div>

                <div>
                    <p className="text-[0.8rem] text-[#6f6353] text-center md:text-right">
                        Meet Capsules®—modern and cozy<br />
                        houses, in the California desert.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;