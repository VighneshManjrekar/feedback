import { toast } from "../ui/use-toast";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileForm() {
  const token = useSelector((state: any) => state.auth.token);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    profile: string;
    role: string;
    resume: string;
  }>();

  async function getUser() {
    try {
      const response: AxiosResponse = await axios.get(
        "http://localhost:7000/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userData = response.data.user;
      console.log(userData);
      setUser({
        name: userData.name,
        email: userData.email,
        profile: userData.profile,
        role: userData.role,
        resume: userData.resume,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-1/2 my-20 border dark:border-gray-600 border-gray-200 p-10 rounded-lg">
      {user && (
        <>
          <Avatar className="flex justify-center">
            <AvatarImage
              src={user.profile}
              className="w-20 h-20 rounded-full"
            />
          </Avatar>
          <div className="flex justify-center my-5">
            <Badge variant={"outline"}>
              {user.role === "seeker" ? "Job Seeker" : "Employer"}
            </Badge>
          </div>
          <div id="profile-container" className="space-y-4">
            <div className="space-y-2">
              <p className="px-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </p>
              <div className="w-full px-5 py-2 bg-gray-50 dark:bg-transparent dark:border-gray-600 border border-gray-200 rounded-md text-sm">
                <p>{user.name}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="px-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </p>
              <div className="w-full px-5 py-2 bg-gray-50 dark:bg-transparent dark:border-gray-600 border border-gray-200 rounded-md text-sm">
                <p>{user.email}</p>
              </div>
            </div>

            <div className="flex justify-center space-x-5 py-5">
              <Link
                to="/resume"
                className="px-1 text-sm font-medium dark:text-gray-300 text-gray-700 hover:underline underline-offset-4 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                download
              >
                Create Resume
              </Link>
              <a
                href={`http://localhost:7000/${user.resume}`}
                className="px-1 text-sm font-medium dark:text-gray-300 text-gray-700 hover:underline underline-offset-4 hover:text-blue-400 dark:hover:text-blue-400 cursor-pointer"
                download
              >
                Download Resume
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
