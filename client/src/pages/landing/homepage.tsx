import FAQ from "./faq";
import Features from "./features";
import Home from "./home";
import HomeNav from "./nav";

export default function homepage() {
  return (
    <div className="font-Geist font-medium">
      <HomeNav />
      <Home />
      <Features />
      <FAQ/>
    </div>
  );
}
