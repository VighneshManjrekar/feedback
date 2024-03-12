//ui
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TokensIcon } from "@radix-ui/react-icons";
import { Input } from "../../ui/input";
//router
import { Link, useNavigate } from "react-router-dom";
//form
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
//data-fetch
import axios, { AxiosResponse } from "axios";
import { setId, setRole, setToken } from "@/store/actions/authAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

type responseData = {
  userId: any;
  success: string;
  token: string;
  role: string;
};

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter valid email",
  }),
  password: z.string(),
});

const Login = () => {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:7000/api/v1/user/login",
        values
      );
      const responseData: responseData = response.data;
      dispatch(setToken(responseData.token));
      dispatch(setId(responseData.userId));
      dispatch(setRole(responseData.role));
      console.log(response);
      toast({
        title: "Login Success",
        description: "Redirecting to Dashboard",
        className: "font-Geist bg-green-500 text-white rounded-xl",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.response.data.error,
        className: "font-Geist bg-red-500 text-white rounded-xl",
      });
    }
  }

  function handleToggle() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <>
      <nav className="z-10 w-full h-[10vh] absolute top-0 font-Geist px-2">
        <div className="p-6 flex w-full place-content-between items-center">
          <div className="flex items-center space-x-2">
            <TokensIcon
              className="w-8 h-8 bg-black lg:border rounded-lg p-1 lg:block"
              color="white"
            />
            <span className="text-black lg:text-white text-lg font-semibold">
              Feedback
            </span>
          </div>
          <Link to={"/register"}>
            <Button className="rounded-lg">Register</Button>
          </Link>
        </div>
      </nav>
      <div className="m-2 h-[97.5vh] relative font-Geist">
        <div className="grid lg:grid-cols-2 h-full">
          <div className="bg-black h-full rounded-l-xl hidden lg:block"></div>
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
                              className="bg-slate-100"
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

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>

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
                    <span className="text-neutral-700 text-sm font-medium cursor-pointer hover:underline">
                      Forgot Password?
                    </span>
                  </div>
                  <p className="mt-10 text-center text-sm">
                    Need an account?{" "}
                    <span className="font-semibold hover:underline underline-offset-4 cursor-pointer">
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
