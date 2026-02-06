import { useFormContext, Controller, type FieldPath, type FieldValues } from "react-hook-form";
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  selectClassName?: string;
}

export default function FormSelect<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option",
  className,
  labelClassName,
  selectClassName,
}: FormSelectProps<T>) {
  const formContext = useFormContext<T>();

  if (!formContext) {
    throw new Error(
      "FormSelect must be used inside a FormProvider from react-hook-form. " +
      "Please wrap your form with <FormProvider> component."
    );
  }

  const {
    control,
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
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value || ""}
            onValueChange={(value: string) => {
              field.onChange(value);
              field.onBlur();
            }}
          >
            <SelectTrigger
              id={name}
              className={selectClassName}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && (
        <p className="mt-1 text-sm text-destructive">
          {error.message as string}
        </p>
      )}
    </div>
  );
}

