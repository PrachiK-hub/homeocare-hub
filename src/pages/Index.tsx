import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyBottomBar from "@/components/StickyBottomBar";

import ConsentBanner from "@/components/ConsentBanner";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Blog />
      <Contact />
                    <Footer />
              <StickyBottomBar />

              <ConsentBanner />
              {/* Add padding to prevent content overlap with sticky bar on mobile */}
              <div className="h-20 md:hidden"></div>
    </div>
  );
};

export default Index;
