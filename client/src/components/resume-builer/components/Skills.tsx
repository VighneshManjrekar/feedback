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
import { SkillsForm } from "../types/resume";

const formSchema = z.object({
  skills: z.string().min(2).max(255),
});

type FormData = z.infer<typeof formSchema>;

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  formData: SkillsForm;
  updateFormData: (data: FormData) => void;
  submit: (value: boolean) => void;
};

const Skills: React.FC<Props> = ({
  prevStep,
  formData,
  updateFormData,
  submit,
}) => {
  const [qualifications, setQualifications] = useState([{}]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values);
    submit(true);
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
