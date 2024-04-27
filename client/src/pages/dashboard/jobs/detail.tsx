import React, { useState } from "react";
import { Job } from "./api";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

interface DetailedJobViewProps {
  job: Job;
}

const DetailedJobView: React.FC<DetailedJobViewProps> = ({ job }) => {
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  async function handleApply(id: string) {
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post(
        `http://localhost:7000/api/v1/job/${id}/apply`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      toast({
        className: "bg-green-500 font-Geist text-white",
        title: "Success",
        description: "You have successfully applied for this job",
      });
    } catch (error) {
      setLoading(false);
      toast({
        className: "font-Geist",
        variant: "destructive",
        title: "Error",
        description: error.response.data.error,
      });
      throw error;
    }
  }

  return (
    <div>
      <Card className=" border border-sky-100 dark:border-gray-800">
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          <CardDescription>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <Badge className="my-3" variant={"outline"}>
              {job.salary}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="-mt-4 space-y-4">
          <Separator />
          <div className="my-4 space-y-4">
            <span className="font-semibold text-md">Description</span>
            <p className="text-sm  dark:text-gray-300">{job.description}</p>
          </div>
          <Separator />
          <div className="my-4 space-y-4">
            <span className="font-semibold text-md">Responsibilities</span>
            <p className="text-sm dark:text-gray-300">{job.responsibilities}</p>
          </div>
          <Separator />
          <div className="my-4 gap-2 flex items-center">
            <Badge className="font-semibold text-sm bg-sky-500 text-white">
              Apply By :
            </Badge>
            <p className="text-sm dark:text-sky-200">
              {format(new Date(job.deadline), "dd/MMM/yyyy")}
            </p>
          </div>
          <Separator />
          <div className="my-4 gap-2 flex items-center">
            <Button
              className="w-1/2 hover:text-white dark:text-white"
              onClick={() => handleApply(job._id)}
            >
              {loading ? <ReloadIcon className="animate-spin" /> : <p>Apply</p>}
            </Button>
            <Link
              to={`${job.link}`}
              className="w-1/2 p-2 rounded-md text-sm text-center bg-transparent dark:text-white font-semibold border border-gray-800 hover:border-sky-500 hover:text-sky-400 dark:hover:border-sky-400 dark:hover:text-sky-400 hover:bg-transparent"
            >
              Go to Original Post
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedJobView;
