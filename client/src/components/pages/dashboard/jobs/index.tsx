import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent } from "../ui/tabs";

import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";

import { formatDistanceToNow } from "date-fns";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import getJobs, { Job } from "./api";
import { useEffect, useState } from "react";
import DetailedJobView from "./detail";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(
    jobs.length > 0 ? jobs[0] : null
  );

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await getJobs();
        setJobs(jobs);
        if (jobs.length > 0) {
          setSelectedJob(jobs[0]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Layout className="h-screen">
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <TabsContent value="overview" className="flex flex-row gap-4">
            <div className="w-1/3 h-full py-8 px-10 rounded">
              <ScrollArea className="h-[35em]">
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card
                      key={job._id}
                      onClick={() => handleJobClick(job)}
                      className="border hover:border-gray-400 hover:bg-neutral-50 dark:hover:bg-gray-900 dark:hover:border-sky-800 hover:cursor-pointer"
                    >
                      <CardHeader>
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription>
                          <p>{job.company}</p>
                          <p>{job.location}</p>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="-mt-4">
                        <Badge variant={"secondary"}>{job.salary}</Badge>
                      </CardContent>
                      <CardFooter className="text-[5px]">
                        {formatDistanceToNow(job.postedAt, { addSuffix: true })}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="w-2/4 rounded-sm h-full py-8 ">
              {selectedJob && <DetailedJobView job={selectedJob} />}
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );
}
