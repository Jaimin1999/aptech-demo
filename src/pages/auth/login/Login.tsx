import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { FormInput } from "@/FormComponents";
import { Button } from "@/components";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";

// Validation schema
const loginSchema = z.object({
    username: z.string().min(1, "Username is required").min(3),
    password: z.string().min(1, "Password is required").min(8),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();

    const methods = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { handleSubmit, setError } = methods;

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data.username, data.password);
            navigate("/");
        } catch (error: any) {

            // Check if it's a 400 status code (invalid credentials)
            if (error?.response?.status === 400 || error?.status === 400) {
                setError("username", {
                    type: "manual",
                    message: "",
                });
                setError("password", {
                    type: "manual",
                    message: "Invalid username or password",
                });
            } else {
                console.error("Login failed:", error);
            }
            // 👉 show toast here
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    Login
                </h2>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <FormInput
                            name="username"
                            label="Username"
                            placeholder="Enter your username"
                            type="text"
                        />

                        <FormInput
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            showPasswordToggle
                        />

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition disabled:opacity-70"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Please wait
                                </span>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}
