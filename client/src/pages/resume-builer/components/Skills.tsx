import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { Separator } from "@/components/ui/separator";
import { SkillsForm } from "../types/resume";

const formSchema = z.object({
  skills: z.string().min(2).max(255),
  github: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
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
  nextStep,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values);
    submit(true);
    nextStep();
  }

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
                  mention skills/languages comma seperated (Max 6)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />
        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input placeholder="www.github.com/rohanny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input placeholder="www.github.com/rohanny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input placeholder="www.github.com/rohanny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input placeholder="www.github.com/rohanny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row gap-4">
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <FormItem className="flex flex-col w-1/2">
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="www.github.com/rohanny" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Skills;
