import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { Label, Input } from "@/components";
import { cn } from "@/lib/utils";

interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export default function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  labelClassName,
  inputClassName,
  ...rest
}: FormInputProps<T>) {
  const formContext = useFormContext<T>();

  if (!formContext) {
    throw new Error(
      "FormInput must be used inside a FormProvider from react-hook-form. " +
      "Please wrap your form with <FormProvider> component."
    );
  }

  const {
    register,
    formState: { errors },
  } = formContext;

  const error = errors[name];

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={name}
        className={cn("text-sm font-medium text-foreground", labelClassName)}
      >
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={inputClassName}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">
          {error.message as string}
        </p>
      )}
    </div>
  );
}

