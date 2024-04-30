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

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ExperienceForm } from "./types/resume";

const formSchema = z.object({
  institute1: z.string().min(2).max(100),
  position1: z.string().min(2).max(100),
  duration1: z.string().min(2).max(50),
  experienceDescription1: z.string().min(2),
  institute2: z.string().optional(),
  position2: z.string().optional(),
  duration2: z.string().optional(),
  experienceDescription2: z.string().optional(),
});

const defData = {
  institute1: "ABC Company",
  position1: "Software Engineer",
  duration1: "2 Years",
  experienceDescription1:
    "Worked on various projects involving web development.",
  institute2: "", // Optional field, leave empty if not required
  position2: "", // Optional field, leave empty if not required
  duration2: "", // Optional field, leave empty if not required
  experienceDescription2: "", // Optional field, leave empty if not required
};

type FormData = z.infer<typeof formSchema>;

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  formData: ExperienceForm;
  updateFormData: (data: FormData) => void;
};

const Experience: React.FC<Props> = ({
  prevStep,
  nextStep,
  formData,
  updateFormData,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values);
    nextStep();
  }
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    setShow(true);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="institute1"
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
          </div>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="position1"
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
              name="duration1"
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
            name="experienceDescription1"
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

        {show ? (
          <div className="space-y-4">
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="institute2"
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
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="position2"
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
                name="duration2"
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
              name="experienceDescription2"
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
        ) : (
          <div className="flex space-x-1">
            <PlusCircledIcon className="w-5 h-5" color="rgb(55 65 81)" />
            <p
              onClick={handleClick}
              className="text-sm text-gray-700 hover:underline underline-offset-4 cursor-pointer"
            >
              Add Other
            </p>
          </div>
        )}
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
