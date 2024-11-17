"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        console.error("Sign-in failed:", result.error);
      } else {
        router.push("/companies");
      }
    } catch (error: unknown) {
      console.error("Sign-in error:", error);
    }
  };

  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit place-content-center">
      <form onSubmit={onSubmit}>
        <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit w-[600px] min-w-fit mx-auto space-y-5">
          <h1 className="font-extrabold text-5xl text-center">Sign In</h1>
          <div className="grid grid-flow-row gap-3">
            <TextInput
              label="Email"
              type="email"
              required={true}
              onChange={setEmail}
              value={email}
            />
            <TextInput
              label="Password"
              type="password"
              required={true}
              onChange={setPassword}
              value={password}
            />
            <Button btnType="submit" text="Submit" type="submit" />
          </div>
          <div className="text-dp-border space-x-2 text-center">
            <label> Not a member?</label>
            <Link href={"/signUp"} className="text-dp-blue-dark font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
