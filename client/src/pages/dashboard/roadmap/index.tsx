import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { toast } = useToast();

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/roadmap",
        {
          title: title.trim().toLowerCase(),
        }
      );

      setLoading(false);
      setTitle("");
      setData(response.data);
    } catch (error) {
      setError(true);
      console.error("Error generating roadmap:", error);
      // alert("Error generating roadmap. Please try again.");
      toast({
        title: "Error",
        description: "Error Generating Roadmap",
        className: "font-Geist bg-red-500 text-white rounded-xl",
      });
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

      {/* {loading == true ? (
        <div>Loading</div>
      ) : data ? (
        <RoadmapComponent roadmap={data}></RoadmapComponent>
      ) : (
        <div>Data Not available</div>
      )} */}

      {data?.success ? (
        <div>
          <RoadmapComponent roadmapData={data} />
        </div>
      ) : (
        <div>No Roadmap for invalid title</div>
      )}
    </div>
  );
}
