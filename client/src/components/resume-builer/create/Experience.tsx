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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  companyName: z.string().min(2).max(100),
  location: z.string().min(2).max(100),
  position: z.string().min(2).max(100),
  duration: z.string().min(2).max(50),
  description: z.string().min(2),
});

type Props = {
  nextStep: () => void;
  prevStep: () => void;
};

const Experience: React.FC<Props> = ({ prevStep, nextStep }) => {
  const [qualifications, setQualifications] = useState([{}]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    nextStep();
  }

  const addQualification = () => {
    setQualifications([...qualifications, {}]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {qualifications.map((qualification, index) => (
          <div className="space-y-4" key={index}>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Company</FormLabel>
                    <FormControl className="w-[380px]">
                      <Input placeholder="Jedi Republic" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Location</FormLabel>
                    <FormControl className="w-[180px]">
                      <Input placeholder="Tatooine" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Position</FormLabel>
                    <FormControl className="w-[280px]">
                      <Input placeholder="Jedi Master" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Duration</FormLabel>
                    <FormControl className="w-[280px]">
                      <Input placeholder="6 Years" {...field} />
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
                    <Textarea
                      placeholder="Served in the Jedi Council.  Ex-Padwan.  Known for denying Anakin's Request to become Master"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator />
          </div>
        ))}

        <div className="flex justify-between">
          <div className="flex space-x-1">
            <PlusCircledIcon className="w-5 h-5" color="rgb(55 65 81)" />
            <p
              onClick={addQualification}
              className="text-sm text-gray-700 hover:underline underline-offset-4 cursor-pointer"
            >
              Add Other
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={() => {
                setTimeout(() => {
                  nextStep();
                }, 300);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I am a Fresher
            </label>
          </div>
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

export default Experience;
