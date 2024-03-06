import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  skills: z.string().min(2).max(255),
  awards: z.object({
    title: z.string().optional(),
    website: z.string().optional(),
  }),
});

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

const Skills: React.FC<Props> = ({ prevStep, nextStep }) => {
  const [qualifications, setQualifications] = useState([{}]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const addQualification = () => {
    setQualifications([...qualifications, {}]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Skills</FormLabel>
                <FormControl>
                  <Input placeholder="React JS,HTML,CSS" {...field} />
                </FormControl>
                <FormDescription>
                  mention skills/languages comma seperated
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator />

          <div className="space-y-5">
            <p className="text-sm font-medium text-slate-700 underline underline-offset-4">
              Awards & Certification
            </p>
            {qualifications.map((qualification, index) => (
              <div className="flex gap-4" key={index}>
                <FormField
                  control={form.control}
                  name="awards.title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Title</FormLabel>
                      <FormControl className="w-[280px]">
                        <Input placeholder="React Developer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="awards.website"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Website</FormLabel>
                      <FormControl className="w-[280px]">
                        <Input placeholder="Coursera" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex space-x-1">
          <PlusCircledIcon className="w-5 h-5" color="rgb(55 65 81)" />
          <p
            onClick={addQualification}
            className="text-sm text-gray-700 hover:underline underline-offset-4 cursor-pointer"
          >
            Add Other
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
            Submit
            <ChevronRightIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Skills;
