import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap/all";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        const smoother = ScrollSmoother.get();
        if (smoother) {
            smoother.scrollTop(0, true);
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;