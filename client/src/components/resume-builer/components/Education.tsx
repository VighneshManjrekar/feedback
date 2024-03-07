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
import { EducationForm } from "../types/resume";

const formSchema = z.object({
  cname: z.string().min(2).max(200),
  areaofstudy: z.string().min(1),
  dateto: z.string(),
  datefrom: z.string(),
  score: z.string().min(0).max(100),
  typeofstudy: z.string().min(1),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  formData: EducationForm;
  updateFormData: (data: FormData) => void;
};

const Education: React.FC<Props> = ({
  prevStep,
  nextStep,
  formData,
  updateFormData,
}) => {
  const [qualifications, setQualifications] = useState([{}]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {qualifications.map((qualification, index) => (
          <div className="space-y-6" key={index}>
            <FormField
              control={form.control}
              name="cname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>College/University Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jedi Temple" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="datefrom"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date From</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="0 BBY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateto"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date To</FormLabel>
                    <FormControl>
                      <Input type="date" placeholder="10 BBY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="score"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Score</FormLabel>
                    <FormControl>
                      <Input placeholder="9.8 CGPA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="typeofstudy"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-1/2">
                    <FormLabel>Type Of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Jedi Arts" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="areaofstudy"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-1/2">
                    <FormLabel>Area of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Force" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator />
          </div>
        ))}

        <div className="flex space-x-1">
          <PlusCircledIcon className="w-5 h-5" color="rgb(55 65 81)" />
          <p
            onClick={addQualification}
            className="text-sm text-gray-700 hover:underline underline-offset-4 cursor-pointer"
          >
            Add Other Qualification
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

export default Education;
