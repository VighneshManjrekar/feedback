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

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Overview } from "./components/overview";

export default function EmpDashboard() {
  const token = useSelector((state: any) => state.auth.token);
  const [responseData, setResponseData] = useState();
  async function getEmpDashboard() {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:7000/api/v1/job/employer/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResponseData(response.data);
    } catch (error) {
      console.error("Error getting dashboard:", error);
      throw error;
    }
  }

  useEffect(() => {
    getEmpDashboard();
  }, []);

  return (
    <>
      {responseData && (
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
                  <div className="text-2xl font-bold">
                    {responseData.jobs.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Applications
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
                  <div className="text-2xl font-bold">
                    {responseData.applications.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
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
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>
                    {responseData.applications.length} applications this month.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* {stats && <RecentSales data={stats} />} */}
                </CardContent>
              </Card>
            </div>
          </LayoutBody>
        </Layout>
      )}
    </>
  );
}
