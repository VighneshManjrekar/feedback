import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import abstract from "../../assets/abstract.svg";
export default function Home() {
  return (
    <div className="container">
      <div className="px-4 md:px-28 w-full">
        <div className="md:grid grid-cols-6 py-12 md:py-24">
          <div className="col-span-4">
            <p className="font-Gilroy text-3xl md:text-5xl !leading-tight">
              Find Your Ideal Career <br /> Opportunities Effortlessly with{" "}
              <br />
              Our Cutting-Edge Job <br /> Matching Platform!
            </p>
            <Link to={"/dashboard"}>
              <Button className="mt-10 px-5 py-7 rounded-full">
                Get Started <ArrowRightIcon className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="col-span-2 hidden md:block">
            <img src={abstract} />
          </div>
        </div>
      </div>
    </div>
  );
}
