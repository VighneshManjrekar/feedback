import { Button } from "@/components/ui/button";
import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useSelector } from "react-redux";
import { Document, Page } from "react-pdf";

const Result = () => {
  const url: string =
    "http://localhost:7000/" + useSelector((state: any) => state.profile.token);
  return (
    <div className="container mx-auto my-10">
      <div className="flex flex-col gap-4 justify-center items-center font-Geist">
        <p>Resume is Created</p>
        <div className="flex justify-center w-2/3 space-x-10">
          <Button className="gap-4">
            <ReloadIcon />
            Restart
          </Button>
          <Button className="gap-4">
            Dashboard
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
