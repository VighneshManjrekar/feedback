import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { saveSteps } from "@/store/actions/goalAction";
import { ClockIcon, TargetIcon } from "@radix-ui/react-icons";
import React from "react";
import { useDispatch } from "react-redux";

interface Step {
  step: string;
  time: string;
}

interface Stage {
  title: string;
  totalTime: string;
  role: string;
  steps: Step[];
}

interface Props {
  roadmapData: {
    success: boolean;
    stage: Stage[];
  };
}

const RoadmapComponent: React.FC<Props> = ({ roadmapData }) => {
  console.log(roadmapData);

  if (!roadmapData.success) {
    return <div>No Roadmap for invalid title</div>;
  }

  const { title, totalTime, steps } = roadmapData.stages;
  const dispatch = useDispatch();

  const addToGoal = () => {
    if (roadmapData) {
      const { steps } = roadmapData.stages;
      dispatch(saveSteps(steps));
      toast({
        title: "Goal Added",
        description: "You can modify the goal in Goals tab",
        className: "font-Geist bg-green-500 text-white rounded-xl",
      });
    }
  };

  return (
    <div>
      <div className="flex gap-2 font-Geist">
        <p className="border w-fit p-2 rounded-sm bg-[#2ec4b6] text-white">
          {title}
        </p>
        <div className="flex gap-2 items-center p-2 border rounded-sm bg-[#ff9f1c] text-white">
          <ClockIcon className="w-5 h-5" />
          <p>{totalTime}</p>
        </div>
        <Button
          className="gap-2 p-3 hover:bg-black hover:text-white"
          variant={"outline"}
          onClick={addToGoal}
        >
          <TargetIcon />
          Set as Goal
        </Button>
      </div>

      <div className="font-Geist">
        <ul role="list" className="my-8 max-w-screen-md">
          {steps.map((step, index) => (
            <li
              key={index}
              className="group relative flex flex-col pb-8 pl-7 last:pb-0"
            >
              <div className="absolute bottom-0 left-[calc(0.25rem-0.5px)] top-0 w-px bg-black group-first:top-3" />
              <div className="absolute left-0 top-2 h-2 w-2 rounded-full border border-sky-300 bg-zinc-950" />
              <h3 className="text-sm/6 font-semibold">Step {index + 1}</h3>
              <p className="mt-0.5 text-sm/6 text-zinc-400">{step.step}</p>
              <div className="w-fit flex gap-2 items-center rounded-sm font-Geist text-sm/6">
                <ClockIcon className="w-4 h-4" />
                <p>{step.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RoadmapComponent;
