import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

export default function ProfileForm() {
  const token = useSelector((state: any) => state.auth.token);
  const usrRole = useSelector((state: any) => state.auth.role);

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
    <div className="w-1/2 border dark:border-gray-600 border-gray-200 p-10 rounded-lg">
      {user ? (
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

            {usrRole === "seeker" && (
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
                  target="blank"
                >
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="space-y-5">
          <Avatar className="flex justify-center">
            <PersonIcon
              className="p-2 w-10 h-10 border rounded-full bg-gray-400"
              color="white"
            />
          </Avatar>

          <div id="profile-container" className="space-y-4">
            <div className="space-y-2">
              <p className="px-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </p>
              <Skeleton className="w-full h-8  rounded-md" />
            </div>

            <div className="space-y-2">
              <p className="px-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </p>
              <Skeleton className="w-full h-8  rounded-md" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
