import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, type FormData } from "./validation";
import { Button } from "@/components";
import { FormInput, FormSelect, FormRadio, FormCheckbox } from "@/FormComponents";
import FormDateInput from "@/FormComponents/FormDateInput/FormDateInput";


export default function HookForm() {

  const roleOptions = [{ value: "admin", label: "Admin" }, { value: "emp", label: "Employee" }]


  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      bio: "",
      role: "emp",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-4 bg-card border rounded-lg p-6 shadow-sm"
        >
          <FormInput
            name="name"
            label="Name"
            placeholder="Enter your name (max 10 letters)"

          />
          <FormInput
            name="bio"
            label="Bio"
            placeholder="Enter your bio (max 10 letters)"
          />
          <FormSelect
            name="role"
            label="Role"
            options={roleOptions}
          />
          <FormRadio
            name="gender"
            label="Gender"
            orientation="horizontal"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ]}
          />
          <FormDateInput
            name="appointmentDate"
            label="Appointment Date"
            placeholder="Select appointment date"
            min={new Date().toISOString().split("T")[0]}
          />
          <FormCheckbox
            name="notifications"
            label="Notification Preferences"
            orientation="horizontal"
            options={[
              { value: "email", label: "Email" },
              { value: "sms", label: "SMS" },
              { value: "push", label: "Push" },
            ]}
          />
          <Button
            type="submit"
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
