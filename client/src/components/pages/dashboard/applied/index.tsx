import ThemeSwitch from "../theme-switch";
import { UserNav } from "../user-nav";
import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function AppliedJobs() {
  const token = useSelector((state: any) => state.auth.token);
  const [applications, setApplications] = useState<
    {
      title: string;
      company: string;
      status: string;
    }[]
  >([]);

  async function getJobs() {
    try {
      const response: AxiosResponse<{ applications: any[] }> = await axios.get(
        "http://localhost:7000/api/v1/job/applications/seeeker/stat",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)

      const applications = response.data.applications;

      const formattedApplications = applications.map((application: any) => ({
        title: application.job.title,
        company: application.job.company,
        status: application.status,
      }));

      setApplications(formattedApplications);
    } catch (error) {
      console.error("Error fetching job applications:", error);
      throw error;
    }
  }

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <Layout className="md:pl-10">
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className="flex flex-col md:w-2/3 p-4" fixedHeight>
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Applied Jobs!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of jobs you applied!
            </p>
          </div>
        </div>
        <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
          {applications && applications.length > 0 ? (
            <DataTable data={applications} columns={columns} />
          ) : (
            <div className="my-4 flex space-x-4 items-center font-Geist">
              <p>Loading</p>
              <ReloadIcon className="animate-spin" />
            </div>
          )}
        </div>
      </LayoutBody>
    </Layout>
  );
}
