import NavbarLanding from "../components/NavbarLanding";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs"

function Landing(){
    return(
        <>
            <NavbarLanding />
            <Hero />
            <Features />
            <AboutUs />
            <Footer />
        </>
    );
}

export default Landing;