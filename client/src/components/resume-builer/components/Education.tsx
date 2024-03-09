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
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

import { Separator } from "@/components/ui/separator";
import { EducationForm } from "../types/resume";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  college: z.string().min(2).max(200),
  fromyear1: z.string().min(1),
  toyear1: z.string(),
  qualification1: z.string().min(1),
  description1: z.string().min(1),
  school: z.string().min(2).max(200),
  fromyear2: z.string().min(1),
  toyear2: z.string(),
  qualification2: z.string().min(1),
  description2: z.string().min(1),
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
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("click");
    updateFormData(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="college"
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

          <div className="flex flex-col xl:flex-row gap-2">
            <FormField
              control={form.control}
              name="fromyear1"
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
              name="toyear1"
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
              name="qualification1"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Type Of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="Jedi Arts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description1"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="mention accomplishments and achievements"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
        </div>

        <div className="space-y-6">
          <FormField
            control={form.control}
            name="school"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School Name</FormLabel>
                <FormControl>
                  <Input placeholder="Jedi Temple" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col xl:flex-row gap-2">
            <FormField
              control={form.control}
              name="fromyear2"
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
              name="toyear2"
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
              name="qualification2"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Type Of Study</FormLabel>
                  <FormControl>
                    <Input placeholder="Jedi Arts" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description2"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="mention accomplishments and achievements"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
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
