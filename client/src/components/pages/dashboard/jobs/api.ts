import axios, { AxiosResponse } from "axios";

export type Job = {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string;
  salary: string;
  deadline: string;
  link: string;
  postedBy: string;
  postedAt: string;
};

export default async function getJobs(): Promise<Job[]> {
  try {
    const response: AxiosResponse<{ success: string; jobs: Job[] }> =
      await axios.get("http://localhost:7000/api/v1/job");
    return response.data.jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
}
