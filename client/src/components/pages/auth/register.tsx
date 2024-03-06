import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
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

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter valid email",
  }),
  password: z
    .string()
    .refine((value) => /^(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(value), {
      message:
        "Password must be at least 8 characters long and contain at least one uppercase letter and one special character.",
    }),
  con_password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const Register = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      con_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="m-2 h-[97vh] relative font-Geist">
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
                className="space-y-5"
              >
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
                          type="password"
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
                  name="con_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-slate-100"
                          placeholder="jedimaster"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex place-content-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember Me
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
  );
};

export default Register;
