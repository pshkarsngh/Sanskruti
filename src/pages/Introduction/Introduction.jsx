import Hero from "../../components/Hero/Hero";
import Welcome from "../../components/Welcome/Welcome";
import Intro from "../../components/Intro/Intro";

const Introduction = () => {
    return (
        <div>
            <Hero />
            <Intro />
            <Welcome />
        </div>
    );
};

export default Introduction;
