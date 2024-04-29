import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useState } from "react";
import RoadmapComponent from "./roadmap";

export interface RoadmapData {
  success: boolean;
  stage: {
    title: string;
    totalTime: string;
    role: string;
    steps: {
      step: string;
      time: string;
    }[];
  }[];
}

export default function index() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState<RoadmapData | null>(null);

  const handleGenerateRoadmap = async () => {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/roadmap",
        {
          title: title.trim().toLowerCase(),
        }
      );

      setTitle("");
      setData(response.data);
    } catch (error) {
      console.error("Error generating roadmap:", error);
      alert("Error generating roadmap. Please try again.");
    }
  };

  return (
    <div className="p-10 font-Geist space-y-4">
      <div className="space-y-3">
        <h1 className="font-semibold text-xl">Generate roadmaps with AI</h1>
        <p>Enter a topic and let the AI generate a roadmap for you</p>
      </div>
      <div className="w-1/2 flex gap-2 py-2">
        <Input
          type="text"
          placeholder="Enter a topic to generate a roadmap for"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleGenerateRoadmap}>Generate</Button>
      </div>

      <Separator />
      {data && (
        <div>
          <RoadmapComponent roadmapData={data} />
        </div>
      )}
    </div>
  );
}
