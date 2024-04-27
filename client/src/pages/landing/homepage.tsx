import FAQ from "./faq";
import Features from "./features";
import Footer from "./footer";
import Home from "./home";
import HomeNav from "./nav";
import Testimonies from "./testomonies";

export default function homepage() {
  return (
    <div className="font-Geist font-medium">
      <HomeNav />
      <Home />
      <Features />
      <FAQ />
      <Testimonies />
      <Footer />
    </div>
  );
}
