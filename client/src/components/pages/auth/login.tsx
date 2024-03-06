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

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter valid email",
  }),
  password: z.string(),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="m-2 h-[98vh] relative font-Geist">
      <div className="grid lg:grid-cols-2 h-full">
        <div className="bg-black h-full rounded-l-xl hidden lg:block"></div>
        <div className="h-full mx-6 flex items-center justify-center">
          <div className="w-1/2">
            <div className=" -mt-20 pb-10 space-y-2">
              <p className="font-bold font-Geist text-2xl">Sign In</p>
              <p className="text-sm text-zinc-400">
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
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <p className="mt-10 text-center text-sm">Need an account? <span className="font-semibold hover:underline underline-offset-4 cursor-pointer">Create an account</span></p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
