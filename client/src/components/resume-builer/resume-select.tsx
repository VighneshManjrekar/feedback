import { Component } from "react";
import { PinBottomIcon, PlusIcon } from "@radix-ui/react-icons";

type Props = {};

type State = {};

export default class ResumePage extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="container mx-auto relative font-Geist">
        <div className="flex flex-col text-center mt-10">
          <h1 className="text-4xl font-semibold font-Raleway">Build Resume</h1>
          <p className="text-sm p-2">
            Start from scratch, or upload your resume
          </p>
        </div>
        <div className="flex justify-center my-10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-40 h-52 relative rounded-md bg-black hover:cursor-pointer">
              <div className="flex justify-center pt-16">
                <PlusIcon color="white" className="w-10 h-10" />
              </div>
              <div className="absolute bottom-1 bg-[#5454548e] border border-[#5a5a5a80] mx-2 rounded-xl">
                <p className="text-sm text-white text-center py-1">
                  Create a New Resume{" "}
                </p>
              </div>
            </div>
            <div className="w-40 h-52 relative rounded-md bg-black hover:cursor-pointer">
              <div className="flex justify-center pt-16">
                <PinBottomIcon color="white" className="w-10 h-10" />
              </div>
              <div className="absolute bottom-1 bg-[#5454548e] border border-[#5a5a5a80] mx-2 rounded-xl">
                <p className="text-sm text-white text-center py-1">
                  Import an existing Resume
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
