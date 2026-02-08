"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

type UserRole = "PROVIDER" | "CUSTOMER";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("CUSTOMER");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Creating account...");
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        image,
      } as any);

      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }

      toast.success("Account created successfully 🎉", { id: toastId });
      window.location.href = "/";
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
  };

  return (
    <Card className="w-md px-2 mx-auto" {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      {/* Role Tabs */}
      <div className="flex justify-center mt-4 mb-6">
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
            role === "CUSTOMER"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setRole("CUSTOMER")}
        >
          Customer
        </button>
        <button
          className={`px-6 py-2 rounded-t-lg font-semibold transition-colors ${
            role === "PROVIDER"
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setRole("PROVIDER")}
        >
          Provider
        </button>
      </div>

      <CardContent>
        <form onSubmit={handleSignup}>
          <FieldGroup>
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="name">{role === "PROVIDER" ? "Provider/Restaurent Name" : "Your Name" } </FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder={role === "PROVIDER" ? "Pizza shop 365" : "John Dou" }
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FieldDescription>
                We'll use this to contact you.
              </FieldDescription>
            </Field>

            {/* Image URL */}
            <Field>
              <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/profile.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <FieldDescription>Optional: link to your profile image.</FieldDescription>
            </Field>

            {/* Provider-specific field */}
            {role === "PROVIDER" && (
              <Field>
                <FieldLabel htmlFor="businessName"></FieldLabel>
                
                <FieldDescription>
                  
                </FieldDescription>
              </Field>
            )}

            {/* Password */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription>Must be at least 8 characters long.</FieldDescription>
            </Field>

            {/* Actions */}
            <Field className="flex flex-col gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <Button onClick={handleGoogleSignup} variant="outline" type="button">
                Sign up with Google
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account? <a href="#">Sign in</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
