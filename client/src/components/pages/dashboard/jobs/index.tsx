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
import { ReloadIcon } from "@radix-ui/react-icons";

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
        <div className="mb-2 flex items-center justify-between space-y-2 pl-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Apply to Jobs!
            </h2>
            <p className="text-muted-foreground">
              Browse through the job postings and apply!
            </p>
          </div>
        </div>
        {jobs ? (
          <Tabs
            orientation="vertical"
            defaultValue="overview"
            className="space-y-4"
          >
            <TabsContent
              value="overview"
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="md:w-1/3 h-full px-10 rounded">
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
                          {formatDistanceToNow(job.postedAt, {
                            addSuffix: true,
                          })}
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="w-2/4 rounded-sm h-full ">
                <ScrollArea className="h-[500px] rounded-md">
                  {selectedJob && <DetailedJobView job={selectedJob} />}
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="my-4 flex space-x-4 items-center font-Geist">
            <p>Loading</p>
            <ReloadIcon className="animate-spin" />
          </div>
        )}
      </LayoutBody>
    </Layout>
  );
}
