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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PersonalDetailsForm } from "./types/resume";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter valid email",
  }),
  fname: z.string().min(2).max(50),
  lname: z.string().min(2).max(50),
  website: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
});

type Props = {
  nextStep: () => void;
  formData: PersonalDetailsForm;
  updateFormData: (data: FormData) => void;
};

type FormData = z.infer<typeof formSchema>;

const PersonalDetails: React.FC<Props> = ({
  nextStep,
  formData,
  updateFormData,
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateFormData(values);
    nextStep();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="fname"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input required placeholder="Anakin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lname"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input required placeholder="Skywalker" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="darthvader@jedi.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input placeholder="the-chosen-one.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="6532-4526-235" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Tatooine" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-between pt-2">
          <Button
            type="submit"
            className="rounded-xl flex justify-between gap-2"
            disabled
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

export default PersonalDetails;
