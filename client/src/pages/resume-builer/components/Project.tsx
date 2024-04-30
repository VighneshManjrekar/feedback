import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ProjectForm } from "./types/resume";

const formSchema = z.object({
  title1: z.string().min(2).max(200),
  link1: z.string(),
  projectDescription1: z.string(),
  title2: z.string().optional(),
  link2: z.string().optional(),
  projectDescription2: z.string().optional(),
  title3: z.string().optional(),
  link3: z.string().optional(),
  projectDescription3: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const defData = {
  title1: "Project Title 1",
  link1: "https://example.com/project1",
  projectDescription1: "Description of project 1.",
  title2: "Project Title 2",
  link2: "https://example.com/project1",
  projectDescription2: "Description of project 1.",
  title3: "Project Title 3",
  link3: "https://example.com/project1",
  projectDescription3: "Description of project 1.",
};

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  formData: ProjectForm;
  updateFormData: (data: FormData) => void;
};

const Project: React.FC<Props> = ({
  prevStep,
  nextStep,
  formData,
  updateFormData,
}) => {
  const [qualifications, setQualifications] = useState([{}]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values);
    nextStep();
  }

  const addQualification = () => {
    setQualifications([...qualifications, {}]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="title1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Resume Builder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link1"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Link</FormLabel>
                <FormControl className="w-full">
                  <Input type="url" placeholder="www.rohannny.me" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projectDescription1"
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

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="title2"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Resume Builder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link2"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Link</FormLabel>
                <FormControl className="w-full">
                  <Input type="url" placeholder="www.rohannny.me" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projectDescription2"
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

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="title3"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Resume Builder" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link3"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Link</FormLabel>
                <FormControl className="w-full">
                  <Input type="url" placeholder="www.rohannny.me" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="projectDescription3"
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
