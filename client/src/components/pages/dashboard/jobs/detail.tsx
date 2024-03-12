import React, { useState } from "react";
import { Job } from "./api";
import { Separator } from "../../../ui/separator";
import { Button } from "../../../ui/button";
import { Badge } from "../../../ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { ReloadIcon } from "@radix-ui/react-icons";

interface DetailedJobViewProps {
  job: Job;
}

const DetailedJobView: React.FC<DetailedJobViewProps> = ({ job }) => {
  const token = useSelector((state: any) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<"success" | "error" | null>();
  const [message, setMessage] = useState<string>("");

  function timer() {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

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
      setResponse("success");
      setMessage("You have successfully applied for this job");
      timer(); // Start the timer for clearing the message

      console.log(response);
    } catch (error) {
      setLoading(false);
      setResponse("error");
      setMessage(error.response.data.error);
      timer(); // Start the timer for clearing the message
      throw error;
    }
  }

  return (
    <div>
      <Card className="hover:cursor-pointer border border-sky-100 dark:border-gray-800">
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
              className="w-1/2 hover:bg-sky-500 hover:text-white"
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
      <div
        className={`text-md font-semibold text-center my-4 ${
          response === "error" && "text-red-500"
        } ${response === "success" && "text-green-500"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default DetailedJobView;
