import { UserNav } from "../sidebar/user-nav";
import ThemeSwitch from "../theme-switch";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Layout, LayoutBody, LayoutHeader } from "../ui/layout";

import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Job } from "../jobs/api";

const formSchema = z.object({
  title: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  description: z.string().min(1),
  responsibilities: z.string().min(1),
  salary: z.string().min(1),
  deadline: z.date(),
  link: z.string(),
});

const today = new Date();
const nextMonth = new Date(today);
nextMonth.setMonth(nextMonth.getMonth() + 1);

const defData = {
  title: "AI Developer",
  company: "ABC Tech",
  location: "New York, USA",
  description: "Developing and maintaining software applications.",
  responsibilities: "Designing, coding, testing, and debugging software.",
  salary: "$80,000",
  deadline: nextMonth,
  link: "https://example.com/job-posting",
};

type FormData = z.infer<typeof formSchema>;

export default function PostJobs() {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: defData,
  });
  async function postJob(values: Job): Promise<AxiosResponse> {
    const { deadline, ...rest } = values;
    const dateString = deadline.toString();
    const updatedValues = { ...rest, deadline: dateString };

    try {
      const response: AxiosResponse<{ success: string; jobs: Job }> =
        await axios.post("http://localhost:7000/api/v1/job", updatedValues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      toast({
        title: "Job Posted",
        description: "You can check the applications in View application Tab",
        className: "font-Geist bg-green-500 text-white rounded-xl",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Post Failed",
        description: error.response.data.error,
        className: "font-Geist bg-red-500 text-white rounded-xl",
      });
      throw error;
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    postJob(values);
  }

  return (
    <Layout className="h-full">
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4 w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Star Pilot" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="Galactic Republic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Coruscant" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input placeholder="400-1000 Solaris" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="400-1000 Solaris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col font-Geist">
                  <FormLabel>Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        className="font-Geist"
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mention responsibilities"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsibilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsibility</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Mention responsibilities"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                className="rounded-xl w-32 flex justify-center gap-2"
              >
                Post Job{" "}
              </Button>
            </div>
          </form>
        </Form>
      </LayoutBody>
    </Layout>
  );
}
