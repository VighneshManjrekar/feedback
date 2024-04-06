import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

export default function Testimonies() {
  return (
    <div className="bg-[#ededed60] py-12 px-8 rounded-3xl mx-44">
      <div className="flex justify-between items-center">
        <div>
          <p>Voices from</p>
          <p className="font-light">the Feedback community</p>
        </div>
        <div className="pr-20 flex space-x-4">
          <ChevronLeftIcon className="w-6 h-6 cursor-pointer" />
          <ChevronRightIcon className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
      <ScrollArea className="w-full py-10">
        <div className="flex w-full gap-4">
          <div className="rounded-[40px] w-1/3 bg-gradient-to-r from-[#232526] to-[#414345] px-8 py-12">
            <p className="text-[#FEFEFE] text-sm line-clamp-8 font-light	tracking-wider	">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              placeat hic quo sint ad doloremque ea provident assumenda ducimus.
              Corrupti sit debitis, saepe repellat aut consectetur! Error quas
              dignissimos at.
            </p>
            <div className="pt-6 pb-3 flex gap-4 items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[#FEFEFE] text-sm font-light">Ben Harold</p>
                <p className="text-[5px] text-[#FEFEFE] tracking-wider flex gap-1">
                  via Twitter
                  <TwitterLogoIcon />
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] w-1/3 bg-gradient-to-r from-[#232526] to-[#414345] px-8 py-12">
            <p className="text-[#FEFEFE] text-sm line-clamp-8 font-light	tracking-wider	">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              placeat hic quo sint ad doloremque ea provident assumenda ducimus.
              Corrupti sit debitis, saepe repellat aut consectetur! Error quas
              dignissimos at.
            </p>
            <div className="pt-6 pb-3 flex gap-4 items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[#FEFEFE] text-sm font-light">Ben Harold</p>
                <p className="text-[5px] text-[#FEFEFE] tracking-wider flex gap-1">
                  via Twitter
                  <TwitterLogoIcon />
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[40px] w-1/3 bg-gradient-to-r from-[#232526] to-[#414345] px-8 py-12">
            <p className="text-[#FEFEFE] text-sm line-clamp-8 font-light	tracking-wider	">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              placeat hic quo sint ad doloremque ea provident assumenda ducimus.
              Corrupti sit debitis, saepe repellat aut consectetur! Error quas
              dignissimos at.
            </p>
            <div className="pt-6 pb-3 flex gap-4 items-center">
              <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-[#FEFEFE] text-sm font-light">Ben Harold</p>
                <p className="text-[5px] text-[#FEFEFE] tracking-wider flex gap-1">
                  via Twitter
                  <TwitterLogoIcon />
                </p>
              </div>
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
