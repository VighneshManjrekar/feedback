import { Link } from "react-router-dom";
import logo from "/logo.svg";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function HomeNav() {
  return (
    <div className="container sticky top-0">
      <div className="px-4 py-8 md:px-28 md:py-12 h-10 w-full">
        <div className="flex justify-between">
          <div className="p-3 w-12 h-12 rounded-sm border bg-clip-padding bg-opacity-50 backdrop-filter backdrop-blur-sm">
            <img src={logo} />
          </div>
          <div className="space-x-4 items-center hidden md:flex">
            <div className="flex justify-center align-middle p-1 rounded-full border border-[#ececec] bg-clip-padding bg-opacity-50 backdrop-filter backdrop-blur-sm">
              <div className="hover:bg-zinc-100 text-center py-3 w-32 rounded-full text-sm">
                <Link to="#">Features</Link>
              </div>
              <div className="hover:bg-zinc-100 text-center py-3 w-32 rounded-full text-sm">
                <Link to="#">How it Works</Link>
              </div>
              <div className="hover:bg-zinc-100 text-center py-3 w-32 rounded-full text-sm">
                <Link to="#">FAQ</Link>
              </div>
            </div>

            <Button className="px-6 py-6 rounded-full">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>

          {/* Mobile Nav */}
          <div className="block md:hidden">
            <div className="p-4 border rounded-sm ">
              <HamburgerMenuIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
