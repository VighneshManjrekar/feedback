import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { TokensIcon } from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { setId, setRole, setToken } from "@/store/actions/authAction";
import { useDispatch } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ResponseType = {
  token: string;
};

const formSchema = z.object({
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

type responseData = {
  userId: any;
  success: string;
  token: string;
  role: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response: AxiosResponse = await axios.post(
        "http://localhost:7000/api/v1/user/register",
        values
      );
      const responseData: responseData = response.data;
      dispatch(setToken(responseData.token));
      dispatch(setId(responseData.userId));
      dispatch(setRole(responseData.role));

      navigate("/resume");
    } catch (error) {
      console.log(error);
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
          <Link to={"/login"}>
            <Button className="rounded-lg">Login</Button>
          </Link>
        </div>
      </nav>
      <div className="m-2 h-[97.5vh] relative font-Geist">
        <div className="grid lg:grid-cols-2 h-full">
          <div className="bg-black h-full rounded-l-xl hidden lg:block"></div>
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-1/2">
              <div className=" -mt-20 pb-4 space-y-2">
                <p className="font-bold font-Geist text-2xl">Sign Up</p>
                <p className="text-sm text-zinc-400">
                  Welcome back! Please enter your details
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
                            className="bg-slate-100"
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
                            className="bg-slate-100"
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
                          <FormControl className="bg-slate-100">
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
