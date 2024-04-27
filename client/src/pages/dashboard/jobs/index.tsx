import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ThemeSwitch from "../theme-switch";
import { UserNav } from "../sidebar/user-nav";

import { formatDistanceToNow } from "date-fns";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import getJobs, { Job } from "./api";
import { useEffect, useState } from "react";
import DetailedJobView from "./detail";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cross1Icon,
  CrossCircledIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  IconArrowsSort,
  IconCalendarUp,
  IconFilter,
} from "@tabler/icons-react";
import { IconCalendarDown } from "@tabler/icons-react";

export default function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>();
  const [val, setVal] = useState<string>("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const handleAddLocation = () => {
    if (location.trim() !== "") {
      setLocations([...locations, location.trim()]);
      setLocation("");
    }
  };

  const handleRemoveLocation = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
    fetchData();
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  const fetchData = async () => {
    try {
      const jobs = await getJobs();
      setJobs(jobs);
      console.log(jobs);
      // if (jobs.length > 0) {
      //   setSelectedJob(jobs[0]);
      // }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSortChange = (value: string) => {
    setVal(value);
    let sortedJobs = [...jobs];
    if (value === "cal-up") {
      sortedJobs.sort((a, b) => new Date(a.postedAt) - new Date(b.postedAt));
    } else if (value === "cal-down") {
      sortedJobs.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
    } else if (value === "salary-up") {
      sortedJobs.sort((a, b) => {
        const salaryA = parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
        const salaryB = parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
        return salaryA - salaryB;
      });
    } else if (value === "salary-down") {
      sortedJobs.sort((a, b) => {
        const salaryA = parseFloat(a.salary.replace(/[^0-9.-]+/g, ""));
        const salaryB = parseFloat(b.salary.replace(/[^0-9.-]+/g, ""));
        return salaryB - salaryA;
      });
    } else {
      fetchData();
      return;
    }

    setJobs(sortedJobs);

    if (sortedJobs.length > 0) {
      setSelectedJob(sortedJobs[0]);
    }
  };

  const handleRemoveSort = () => {
    setVal("");
    fetchData();
  };

  const handleChange = (value: string) => {
    setSelectedJob();
    if (value.trim() === "") {
      fetchData();
    } else {
      const searchTerms = value
        .toLowerCase()
        .split(" ")
        .filter((term) => term.trim() !== "");
      const filteredJobs = jobs.filter((job) => {
        return searchTerms.every((term) =>
          job.title.toLowerCase().includes(term)
        );
      });
      setJobs(filteredJobs);
    }
  };

  const handleFilter = () => {
    let filteredJobs = jobs;

    if (locations.length > 0) {
      filteredJobs = filteredJobs.filter((job) =>
        locations.includes(job.location)
      );
    }

    if (minSalary !== "" && maxSalary !== "") {
      filteredJobs = filteredJobs.filter((job) => {
        const salary = parseFloat(job.salary.replace(/[^0-9.-]+/g, ""));
        return (
          salary >= parseFloat(minSalary) && salary <= parseFloat(maxSalary)
        );
      });
    }

    // Update the state with filtered jobs
    setJobs(filteredJobs);
  };

  return (
    <Layout className="">
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

        {/* Filter and Sorting */}

        <div className="mx-10 border rounded-md w-[61em] p-2">
          <div className="p-3 rounded-md flex gap-2">
            <div className="flex gap-2 w-5/6">
              <Input
                className="rounded-sm"
                type="email"
                placeholder="Search by Title"
                onChange={(e) => handleChange(e.target.value)}
              ></Input>
            </div>

            <div>
              <Dialog>
                <DialogTrigger>
                  <Button className="gap-2 bg-purple-500 hover:bg-purple-600 dark:text-white">
                    Filter
                    <IconFilter size={15} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="font-Geist">
                  <DialogHeader>
                    <DialogTitle>Filter</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p>Salary</p>
                      <div className="flex gap-4 justify-center items-center">
                        <Input
                          className="rounded-sm"
                          type="number"
                          value={minSalary}
                          onChange={(e) => setMinSalary(e.target.value)}
                        />
                        <p>to</p>
                        <Input
                          className="rounded-sm"
                          type="number"
                          value={maxSalary}
                          onChange={(e) => setMaxSalary(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p>Location</p>
                      <div className="flex gap-4 justify-center items-center">
                        <Input
                          className="rounded-sm"
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        <Button
                          className="dark:text-white bg-indigo-700 hover:bg-indigo-800"
                          onClick={handleAddLocation}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="space-x-2">
                        {locations.map((loc, index) => (
                          <Badge
                            key={index}
                            className="border px-2 py-1 gap-1 rounded-sm dark:text-white bg-slate-600 hover:bg-slate-700"
                          >
                            <p>{loc}</p>
                            <CrossCircledIcon
                              onClick={() => handleRemoveLocation(index)}
                              className="cursor-pointer"
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <DialogClose asChild>
                      <Button
                        className="gap-2 bg-purple-500 hover:bg-purple-600 dark:text-white"
                        onClick={handleFilter}
                      >
                        Apply Filter
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="gap-2 bg-teal-500 hover:bg-teal-600 dark:text-white">
                    Sort
                    <IconArrowsSort size={15} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 font-Geist">
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={val}
                    onValueChange={handleSortChange}
                  >
                    <DropdownMenuRadioItem
                      className="flex gap-2"
                      value="salary-up"
                    >
                      <ArrowUpIcon />
                      Salary (Ascending)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex gap-2"
                      value="salary-down"
                    >
                      <ArrowDownIcon />
                      Salary (Descending)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex gap-2"
                      value="cal-up"
                    >
                      <IconCalendarUp size={20} />
                      Date Added (Oldest)
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      className="flex gap-2"
                      value="cal-down"
                    >
                      <IconCalendarDown size={20} />
                      Date Added (Recent)
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="px-4 space-x-4">
            {val !== "" ? (
              <Badge className="bg-teal-600 hover:bg-teal-600 gap-2 dark:text-white px-2 py-1 gap-1">
                {val === "cal-up" && "Date Added (Oldest)"}
                {val === "cal-down" && "Date Added (Recent)"}
                {val === "salary-up" && "Salary (Ascending)"}
                {val === "salary-down" && "Salary (Descending)"}

                <CrossCircledIcon
                  className="cursor-pointer"
                  onClick={handleRemoveSort}
                />
              </Badge>
            ) : (
              <></>
            )}

            {locations.map((loc, index) => (
              <Badge
                key={index}
                className="px-2 py-1 gap-1 rounded-sm dark:text-white bg-purple-600 hover:bg-purple-700"
              >
                <p>{loc}</p>
                <CrossCircledIcon
                  onClick={() => handleRemoveLocation(index)}
                  className="cursor-pointer"
                />
              </Badge>
            ))}
          </div>
        </div>

        {jobs ? (
          <div className="flex">
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
          </div>
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
