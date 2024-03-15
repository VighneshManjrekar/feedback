//ui
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TokensIcon } from "@radix-ui/react-icons";
import { Input } from "../../components/ui/input";
//router
import { Link, useNavigate } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//data-fetch
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { login } from "./api";
import { useDispatch } from "react-redux";
import { responseData } from "@/types/auth";
import { setId, setRole, setToken } from "@/store/actions/authAction";

import background from "../../assets/frame.png";

export const loginSchema = z.object({
  email: z.string().min(2, {
    message: "Enter valid email",
  }),
  password: z.string(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const res: responseData = await login(values);
    if (res.success === true) {
      dispatch(setToken(res.token));
      dispatch(setId(res.userId));
      dispatch(setRole(res.role));

      toast({
        title: "Login Success",
        description: "Redirecting to Dashboard",
        className: "font-Geist bg-green-500 text-white rounded-xl",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast({
        title: "Login Failed",
        description: res.response.data.error,
        className: "font-Geist bg-red-500 text-white rounded-xl",
      });
    }
  };

  function handleToggle() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <>
      <nav className="z-10 w-full h-[10vh] absolute top-0 font-Geist px-2">
        <div className="p-6 flex w-full place-content-between items-center">
          <div className="flex items-center space-x-2">
            <TokensIcon
              className="w-8 h-8 bg-green-500 rounded-sm p-1 lg:block"
              color="white"
            />
            <span className=" text-white text-lg font-semibold">Feedback</span>
          </div>
          <Link to={"/register"}>
            <Button className="rounded-lg">Register</Button>
          </Link>
        </div>
      </nav>
      <div className="h-screen relative font-Geist">
        <div className="grid lg:grid-cols-2 h-full">
        <div className="h-screen hidden lg:block relative border-r border-green-100">
            <img
              className="h-screen"
              src={background}
              style={{ width: "100%", objectFit: "cover" }}
            />
            <div className="absolute bottom-20 left-10">
              <p className="font-Raleway text-6xl font-medium text-green-800">
                Unlock <br /> Your Potential
              </p>
              <p className="text-sm ml-2 mt-2 text-green-700">
                Streamline Your Career Journey with Feedback
              </p>
            </div>
          </div>
          <div className="h-full mx-6 flex items-center justify-center">
            <div className="w-1/2">
              <div className=" -mt-20 pb-10 space-y-2">
                <p className="font-bold font-Geist text-2xl">Sign In</p>
                <p className="text-sm text-zinc-500">
                  Welcome back! Please enter your details
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="space-y-5">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-slate-100  dark:text-black"
                              type="email"
                              placeholder="obiwan@jedi.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              className="bg-slate-100  dark:text-black"
                              type={showPassword ? "text" : "password"}
                              placeholder="jedimaster"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex place-content-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show" onCheckedChange={handleToggle} />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Password
                      </label>
                    </div>
                    <span className="text-neutral-700 dark:text-gray-200 text-sm font-medium cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>

                  <p className="mt-10 text-center text-sm">
                    Need an account?{" "}
                    <span
                      className="font-semibold hover:underline underline-offset-4 cursor-pointer"
                      onClick={() => navigate("/register")}
                    >
                      Create an account
                    </span>
                  </p>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
