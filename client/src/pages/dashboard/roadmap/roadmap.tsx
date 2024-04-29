import { ClockIcon } from "@radix-ui/react-icons";
import React from "react";

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
  if (
    !roadmapData ||
    !roadmapData.stage.length ||
    !roadmapData.stage[0].steps.length
  ) {
    // Handle case where data is not available or request was unsuccessful
    return <div>No roadmap data available</div>;
  }

  const { title, totalTime, steps } = roadmapData.stage[0];

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
