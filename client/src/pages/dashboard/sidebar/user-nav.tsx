import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export function UserNav() {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    profile: string;
    role: string;
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
      setUser({
        name: userData.name,
        email: userData.email,
        profile: userData.profile,
        role: userData.role,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.profile} alt="profile picture" />
            {/* <AvatarFallback>{}</AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-Geist" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/dashboard")}>
            Dashboard
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/applied")}>
            Applied Jobs
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/profiles")}>
            Profile
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/login");
          }}
        >
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
