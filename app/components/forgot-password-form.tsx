import { cn } from "cn";
import { toast } from "sonner";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { type UserType } from "~/contexts/AuthContext";
import api from "~/lib/api";

export function ForgotPasswordForm({
    className,
    user,
    ...props
}: { user: UserType } & React.ComponentProps<"div">) {
    async function sendResetLink(data: FormData) {
        const email = data.get("email")?.toString();

        if (!email) {
            return;
        }

        const userApi = user === "seller" ? api.seller : api.partner;
        await userApi.forgotPassword({ email });

        toast("Reset link sent to your email");
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden p-0">
                <CardContent className="grid p-0 md:grid-cols-2">
                    <form className="p-6 md:p-8" action={sendResetLink}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">
                                    Reset Password
                                </h1>
                                <p className="text-balance text-muted-foreground">
                                    Enter your email address
                                </p>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
                            </Field>
                        </FieldGroup>
                    </form>
                    <div className="relative hidden bg-muted md:block">
                        <img
                            src="/rider.jpg"
                            alt="Image"
                            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
