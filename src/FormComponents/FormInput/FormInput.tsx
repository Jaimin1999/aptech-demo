import { useState } from "react";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
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
  showPasswordToggle?: boolean; // New prop for password visibility toggle
}

export default function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  type = "text",
  className,
  labelClassName,
  inputClassName,
  showPasswordToggle = false,
  ...rest
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
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
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={name}
        className={cn("text-sm font-medium text-foreground", labelClassName)}
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          {...register(name)}
          className={cn(
            isPassword && showPasswordToggle && "pr-12",
            inputClassName
          )}
          {...rest}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring rounded p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-destructive">
          {error.message as string}
        </p>
      )}
    </div>
  );
}