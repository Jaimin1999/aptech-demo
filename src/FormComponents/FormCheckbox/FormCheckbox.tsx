import {
    useFormContext,
    Controller,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";
import { Label, Checkbox } from "@/components";
import { cn } from "@/lib/utils";

interface CheckboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}

interface FormCheckboxProps<TFieldValues extends FieldValues = FieldValues> {
    name: FieldPath<TFieldValues>;
    label: string;
    options: CheckboxOption[];
    className?: string;
    labelClassName?: string;
    checkboxGroupClassName?: string;
    orientation?: "vertical" | "horizontal";
}

export default function FormCheckbox<
    TFieldValues extends FieldValues = FieldValues
>({
    name,
    label,
    options,
    className,
    labelClassName,
    checkboxGroupClassName,
    orientation = "vertical",
}: FormCheckboxProps<TFieldValues>) {
    const formContext = useFormContext<TFieldValues>();

    if (!formContext) {
        throw new Error(
            "FormCheckbox must be used inside a FormProvider from react-hook-form. " +
            "Please wrap your form with <FormProvider> component."
        );
    }

    const {
        control,
        formState: { errors },
    } = formContext;

    const error = errors[name] as { message?: string } | undefined;

    return (
        <div className={cn("space-y-3", className)}>
            <Label className={cn("text-sm font-medium", labelClassName)}>
                {label}
            </Label>

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const currentValue = Array.isArray(field.value)
                        ? (field.value as string[])
                        : [];
                    const handleCheckboxChange = (optionValue: string, checked: boolean) => {
                        if (checked) {
                            field.onChange([...currentValue, optionValue]);
                        } else {
                            field.onChange(
                                currentValue.filter((value: string) => value !== optionValue)
                            );
                        }
                    };

                    return (
                        <div
                            className={cn(
                                "space-y-2",
                                orientation === "horizontal" && "flex flex-row gap-4 space-y-0",
                                checkboxGroupClassName
                            )}
                        >
                            {options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`${name}-${option.value}`}
                                        checked={currentValue.includes(option.value)}
                                        onCheckedChange={(checked) =>
                                            handleCheckboxChange(option.value, checked as boolean)
                                        }
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
                        </div>
                    );
                }}
            />

            {error && (
                <p className="text-sm text-red-500">
                    {error.message as string}
                </p>
            )}
        </div>
    );
}