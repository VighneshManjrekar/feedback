import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent } from "../ui/tabs";

import ThemeSwitch from "../theme-switch";
import { UserNav } from "../sidebar/user-nav";

import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

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

export default function Jobs() {
  const token = useSelector((state: any) => state.auth.token);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [selectedCard, setSelectedCard] = useState<StatItem | null>(
    stats.length > 0 ? stats[0] : null
  );
  const handleCardClick = (item: StatItem) => {
    setSelectedCard(item);
  };

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
              View Application
            </h2>
            <p className="text-muted-foreground">
              View applications submitted by job seekers.
            </p>
          </div>
        </div>

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
                  {stats &&
                    stats.map((item) => (
                      <Card
                        key={item.appId}
                        className="border hover:border-gray-400 hover:bg-neutral-50 dark:hover:bg-gray-900 dark:hover:border-sky-800 hover:cursor-pointer"
                        onClick={() => handleCardClick(item)}
                      >
                        <CardHeader>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.company}</CardDescription>
                        </CardHeader>
                        <CardContent className="-mt-4">
                          <Badge variant={"secondary"}>{item.salary}</Badge>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>

            <div className="w-2/4 rounded-sm h-full ">
              <ScrollArea className="h-[500px] rounded-md">
                <div className="w-2/3 border py-4 px-6 space-y-4 rounded-xl">
                  <div className="px-1 space-x-2 flex items-center">
                    <span className="text-sm">Applicants</span>
                    <Badge
                      variant={"outline"}
                      className="bg-gray-800 text-white dark:bg-white dark:text-black rounded-full"
                    >
                      {selectedCard?.applications.length}
                    </Badge>
                  </div>

                  {selectedCard &&
                    selectedCard.applications.map((applicants) => (
                      <Card className="hover:cursor-pointer shadow dark:border-gray-800">
                        <CardHeader>
                          <CardTitle>{applicants.name}</CardTitle>
                          <CardDescription>{applicants.email}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  );
}
