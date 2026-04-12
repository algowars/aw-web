import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { routerConfig } from "@/router-config";

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <Card>
      <CardContent>
        <form className={cn("flex flex-col gap-6", className)} {...props}>
          <FieldGroup>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-muted-foreground text-sm text-balance">
                Fill in the form below to create your account
              </p>
            </div>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <Field>
              <Button type="submit">Create Account</Button>
            </Field>
            <Field>
              <Button variant="outline" type="button" asChild>
                <a href="/auth/login?screen_hint=signup">Sign up with Auth0</a>
              </Button>
            </Field>
            <Field>
              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <Button variant="link" asChild className="px-0">
                  <Link href={routerConfig.login.path}>Log in</Link>
                </Button>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
