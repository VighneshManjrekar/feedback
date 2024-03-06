import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

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
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  projectName: z.string().min(2).max(200),
  link: z.string().optional(),
  date: z.string(),
  description: z.string().optional(),
});

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

const Project: React.FC<Props> = ({ prevStep, nextStep }) => {
  const [qualifications, setQualifications] = useState([{}]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    nextStep();
    console.log(values);
  }

  const addQualification = () => {
    setQualifications([...qualifications, {}]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {qualifications.map((qualification, index) => (
          <div className="space-y-4" key={index}>
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Resume Builder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Link</FormLabel>
                    <FormControl className="w-[300px]">
                      <Input
                        type="url"
                        placeholder="www.rohannny.me"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>
        ))}

        <div className="flex space-x-1">
          <PlusCircledIcon className="w-5 h-5" color="rgb(55 65 81)" />
          <p
            onClick={addQualification}
            className="text-sm text-gray-700 hover:underline underline-offset-4 cursor-pointer"
          >
            Add Other Project
          </p>
        </div>
        <div className="flex justify-between pt-2">
          <Button
            onClick={() => {
              prevStep();
            }}
            className="rounded-xl flex justify-between gap-2"
          >
            <ChevronLeftIcon />
            Back
          </Button>
          <Button
            type="submit"
            className="rounded-xl flex justify-between gap-2"
          >
            Next
            <ChevronRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Project;
