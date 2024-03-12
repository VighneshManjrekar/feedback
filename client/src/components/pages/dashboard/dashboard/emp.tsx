import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent } from "../ui/tabs";

import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";

import { Layout, LayoutBody, LayoutHeader } from "../ui//layout";

import { Overview } from "./components/overview";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";

export type Application = {
  _id: string;
  name: string;
  email: string;
};

export type StatItem = {
  appId: string;
  title: string;
  company: string;
  salary: string;
  applications: Application[];
};

export default function EmpDashboard() {
  const engagementRate = Math.floor(Math.random() * 100);

  const token = useSelector((state: any) => state.auth.token);
  const role = useSelector((state: any) => state.auth.role);

  const [stats, setStats] = useState<StatItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<StatItem | null>(
    stats.length > 0 ? stats[0] : null
  );

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/v1/job/applications",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(response.data.stat);
      console.log(response.data.stat);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
        <Tabs
          orientation="vertical"
          defaultValue="overview"
          className="space-y-4"
        >
          <TabsContent value="overview" className="space-y-4">
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
                    Application Engagement
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
                  <div className="text-2xl font-bold">{engagementRate}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 100)}% Seen rate
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
                  <Overview role={role} />
                </CardContent>
              </Card>
              <Card className="col-span-1 lg:col-span-3 hidden">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>applications this month.</CardDescription>
                </CardHeader>
                <CardContent>as</CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );
}
