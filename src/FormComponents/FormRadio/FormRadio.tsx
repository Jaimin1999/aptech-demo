import {
    useFormContext,
    Controller,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";
import { Label, RadioGroup, RadioGroupItem } from "@/components";
import { cn } from "@/lib/utils";

interface RadioOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface FormRadioProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    options: RadioOption[];
    className?: string;
    labelClassName?: string;
    radioGroupClassName?: string;
    orientation?: "vertical" | "horizontal";
}

export default function FormRadio<TFieldValues extends FieldValues = FieldValues>({
    name,
    label,
    options,
    className,
    labelClassName,
    radioGroupClassName,
    orientation = "vertical",
}: FormRadioProps<TFieldValues>) {
    const formContext = useFormContext<TFieldValues>();

    if (!formContext) {
        throw new Error(
            "FormRadio must be used inside a FormProvider from react-hook-form. " +
            "Please wrap your form with <FormProvider> component."
        );
    }

    const {
        control,
        formState: { errors },
    } = formContext;

    const error = errors[name];

    return (
        <div className={cn("space-y-3", className)}>
            <Label className={cn("text-sm font-medium", labelClassName)}>
                {label}
            </Label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className={cn(
                            orientation === "horizontal" && "flex flex-row gap-4",
                            radioGroupClassName
                        )}
                    >
                        {options.map((option) => (
                            <div key={option.value} className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value={option.value}
                                    id={`${name}-${option.value}`}
                                    disabled={option.disabled}
                                />
                                <Label
                                    htmlFor={`${name}-${option.value}`}
                                    className={cn(
                                        "font-normal cursor-pointer",
                                        option.disabled && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {option.label}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                )}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error.message as string}
                </p>
            )}
        </div>
    );
}