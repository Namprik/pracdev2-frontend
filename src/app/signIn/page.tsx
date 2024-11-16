"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    if (email && password) {
      console.log("sign in", email, password);
    }
  };

  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit place-content-center">
      <form onSubmit={signIn}>
        <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit w-[600px] min-w-fit mx-auto space-y-5">
          <h1 className="font-extrabold text-5xl text-center">Sign Up</h1>
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
              type="text"
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
