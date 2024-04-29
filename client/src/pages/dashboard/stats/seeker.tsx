import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { UserNav } from "../sidebar/user-nav";
import ThemeSwitch from "../theme-switch";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";

import { Overview } from "./components/overview";
import { RecentSales } from "./components/recent-sales";

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

type jobs = {
  jobTitle: string;
  jobCompany: string;
  jobSalary: string;
  deadline: string;
};

export default function SeekerDashboard() {
  const token = useSelector((state: any) => state.auth.token);

  const [stats, setStats] = useState<jobs[]>([]);
  const [jobSeen, setJobSeen] = useState<number>(0);

  async function getSeekerDashboard() {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:7000/api/v1/job/applications/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = response.data;
      console.log(responseData);
      const newStats: jobs[] = responseData.stats.map((item) => ({
        jobTitle: item.job.title,
        jobCompany: item.job.company,
        jobSalary: item.job.salary,
        deadline: item.job.deadline,
      }));

      const seenCount = responseData.stats.filter(
        (stat) => stat.status === "seen"
      ).length;

      setStats(newStats);
      setJobSeen(seenCount);
    } catch (error) {
      console.error("Error getting dashboard:", error);
      throw error;
    }
  }

  useEffect(() => {
    getSeekerDashboard();
  }, []);

  return (
    <>
      <Layout>
        {/* ===== Top Heading ===== */}
        <LayoutHeader>
          <div className="ml-auto flex items-center space-x-4">
            <ThemeSwitch />
            <UserNav />
          </div>
        </LayoutHeader>

        {/* ===== Main ===== */}
        <LayoutBody className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Jobs
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.length}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Applications Seen
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobSeen}</div>
                <p className="text-xs text-muted-foreground">
                  {((jobSeen / stats.length) * 100).toFixed(2)}% Seen rate
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview role="seeker" />
              </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  {stats.length} applications this month.
                </CardDescription>
              </CardHeader>
              <CardContent>{stats && <RecentSales data={stats} />}</CardContent>
            </Card>
          </div>
        </LayoutBody>
      </Layout>
    </>
  );
}
