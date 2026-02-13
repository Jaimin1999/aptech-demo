import {
    SidebarLayout,
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    RadioGroup,
    RadioGroupItem,
    Label,
} from "@/components";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeContext/ThemeContext";

export default function Settings() {
    const { theme, setTheme } = useTheme();

    return (
        <SidebarLayout>
            <div className="p-4 space-y-6 max-w-xl">

                <Card>
                    <CardHeader>
                        <CardTitle>Theme Settings</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <RadioGroup
                            value={theme}
                            onValueChange={(value) => setTheme(value as "light" | "dark")}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light" className="flex items-center gap-2">
                                    <Sun className="h-4 w-4" />
                                    Light
                                </Label>
                            </div>

                            <div className="flex items-center gap-3">
                                <RadioGroupItem value="dark" id="dark" />
                                <Label htmlFor="dark" className="flex items-center gap-2">
                                    <Moon className="h-4 w-4" />
                                    Dark
                                </Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>

            </div>
        </SidebarLayout>
    );
}
