"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GithubIcon, Send } from "lucide-react";

export default function SignUpForm() {
  const [role, setRole] = useState("user"); // "user" is the default
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ role, name, email, password });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome Back!</CardTitle>
        <CardDescription>
          Login with your Github or Email Account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Button className="w-full" variant="outline" type="button">
            <GithubIcon size={16} /> Sign in with Github
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                required
                id="name"
                type="text"
                value={name}
                className="text-sm"
                placeholder="FFmpeg"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                id="email"
                type="email"
                value={email}
                className="text-sm"
                placeholder="test123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                required
                id="password"
                type="password"
                value={password}
                className="text-sm"
                placeholder="14J&*%1va"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <Label className="mb-2 block">Role</Label>
              <RadioGroup value={role} onValueChange={setRole}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="user" id="r1" />
                  <Label htmlFor="r1">User</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="admin" id="r2" />
                  <Label htmlFor="r2">Admin</Label>
                </div>
              </RadioGroup>
            </div>

            <Button className="w-full bg-primary text-white" type="submit">
              <Send size={16} /> Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
