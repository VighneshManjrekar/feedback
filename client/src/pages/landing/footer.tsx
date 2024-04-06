import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import logo from "/logo.svg";

export default function Footer() {
  return (
    <div className="px-4 md:px-52 py-20 font-Quicksand">
      <footer>
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <div className="flex items-center space-x-4">
              <img src={logo} className="w-6 h-6" />
              <span className="text-xl font-semibold">Feedback</span>
            </div>
          </div>
          <div className="col-span-1">
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">Socials</p>
              <div className="py-8 space-y-6">
                <p className="flex flex-row items-center gap-2 text-[#9D9D9D] cursor-pointer font-semibold hover:text-blue-600">
                  <InstagramLogoIcon className="w-5 h-5" color="#9D9D9D" />
                  Instagram
                </p>
                <p className="flex flex-row items-center gap-2 text-[#9D9D9D] cursor-pointer font-semibold hover:text-blue-600">
                  <TwitterLogoIcon className="w-5 h-5" color="#9D9D9D" />
                  Twitter
                </p>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col">
              <p className="text-2xl font-semibold">Site</p>
              <div className="py-8 space-y-6">
                <p className="flex flex-row items-center gap-2 text-[#9D9D9D] cursor-pointer font-semibold hover:text-blue-600">
                  Home
                </p>
                <p className="flex flex-row items-center gap-2 text-[#9D9D9D] cursor-pointer font-semibold hover:text-blue-600">
                  Dashboard
                </p>
                <p className="flex flex-row items-center gap-2 text-[#9D9D9D] cursor-pointer font-semibold hover:text-blue-600">
                  Contact
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
