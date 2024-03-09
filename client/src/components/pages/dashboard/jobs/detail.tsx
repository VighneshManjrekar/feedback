import React from "react";
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

interface DetailedJobViewProps {
  job: Job;
}

const DetailedJobView: React.FC<DetailedJobViewProps> = ({ job }) => (
  <div>
    <Card className="hover:cursor-pointer">
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
          <p className="text-sm text-gray-300">{job.description}</p>
        </div>
        <Separator />
        <div className="my-4 space-y-4">
          <span className="font-semibold text-md">Responsibilities</span>
          <p className="text-sm text-gray-300">{job.responsibilities}</p>
        </div>
        <Separator />
        <div className="my-4 gap-2 flex items-center">
          <Badge className="font-semibold text-sm bg-sky-500 text-white">
            Apply By :
          </Badge>
          <p className="text-sm text-sky-200">
            {format(new Date(job.deadline), "dd/MMM/yyyy")}
          </p>
        </div>
        <Separator />
        <div className="my-4 gap-2 flex items-center">
          <Button className="w-1/2 hover:bg-sky-500 hover:text-white">
            Apply
          </Button>
          <Link
            to={`${job.link}`}
            className="w-1/2 p-2 rounded-md text-sm text-center bg-transparent text-white border border-gray-800 hover:border-sky-400 hover:text-sky-400 hover:bg-transparent"
          >
            Go to Original Post
          </Link>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default DetailedJobView;
