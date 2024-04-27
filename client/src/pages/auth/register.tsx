import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { setId, setRole, setToken } from "@/store/actions/authAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokensIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import background from "../../assets/frame.png";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { responseData } from "@/types/auth";
import { register } from "./api";

export const resSchema = z.object({
  email: z
    .string()
    .email({ message: "A valid email address should be provided" }),
  name: z.string(),
  password: z
    .string()
    .refine((value) => /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value), {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter and one special character.",
    }),
  role: z.string(),
});

const Register = () => {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof resSchema>>({
    resolver: zodResolver(resSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  function handleToggle() {
    setShowPassword((prevState) => !prevState);
  }

  const onSubmit = async (values: z.infer<typeof resSchema>) => {
    const res: responseData = await register(values);
    if (res.success === true) {
      dispatch(setToken(res.token));
      dispatch(setId(res.userId));
      dispatch(setRole(res.role));
      toast({
        title: "Resigtration Success",
        description: "Redirecting",
        className: "font-Geist bg-green-500 text-white rounded-xl",
      });

      setTimeout(() => {
        if (res.role === "seeker") {
          navigate("/resume");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } else {
      console.log(res);
      toast({
        title: "Resigtration Failed",
        description: res.response.data.error,
        className: "font-Geist bg-red-500 text-white rounded-xl",
      });
    }
  };

  return (
    <>
      <nav className="z-10 w-full h-[10vh] absolute top-0 font-Geist px-2 text-black">
        <div className="p-6 flex w-full place-content-between items-center">
          <div className="flex items-center space-x-2">
            <TokensIcon
              className="w-8 h-8 bg-teal-500 rounded-sm p-1 lg:block"
              color="white"
            />
            <span className=" text-white text-lg font-semibold">Feedback</span>
          </div>
          <Link to={"/login"}>
            <Button className="rounded-lg">Login</Button>
          </Link>
        </div>
      </nav>
      <div className="h-dvh relative font-Geist">
        <div className="grid lg:grid-cols-2 h-full">
          <div className="h-screen hidden lg:block relative border-r border-green-100">
            <img
              className="h-screen"
              src={background}
              style={{ width: "100%", objectFit: "cover" }}
            />
            <div className="absolute bottom-20 left-10">
              <p className="font-Raleway text-6xl font-medium text-green-800">
                Join <br /> Our Community
              </p>
              <p className="text-sm ml-2 mt-2 text-green-700">
                Register to Kickstart Your Career Growth Journey
              </p>
            </div>
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-1/2">
              <div className=" -mt-20 pb-4 space-y-2">
                <p className="font-bold font-Geist text-2xl">Sign Up</p>
                <p className="text-sm text-zinc-500">
                  Enter your details to create your account
                </p>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-slate-100 dark:text-black"
                            type="text"
                            placeholder="Obi Wan"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            className="bg-slate-100 dark:text-black"
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
                            className="bg-slate-100 dark:text-black"
                            type={showPassword ? "text" : "password"}
                            placeholder="jedimaster"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="bg-slate-100 dark:text-black">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="font-Geist cursor-pointer">
                            <SelectItem value="seeker">Seeker</SelectItem>
                            <SelectItem value="employer">Employer</SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex place-content-between py-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="show" onCheckedChange={handleToggle} />
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Show Password
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
