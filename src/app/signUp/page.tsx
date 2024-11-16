"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    if (name && phone && email && password) {
      console.log("sign up", name, email, phone, password);
    }
  };

  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit place-content-center">
      <form onSubmit={signUp}>
        <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit w-[600px] min-w-fit mx-auto space-y-5">
          <h1 className="font-extrabold text-5xl text-center">Sign Up</h1>
          <div className="grid grid-flow-row gap-3">
            <TextInput
              label="Name - LastName"
              type="text"
              required={true}
              onChange={setName}
              value={name}
            />
            <TextInput
              label="Telephone"
              type="tel"
              required={true}
              onChange={setPhone}
              value={phone}
            />
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
          </div>
          <div className="space-y-3">
            <Link href={"/signIn"}>
              <Button btnType="cancel" text="Cancel" />
            </Link>
            <Button btnType="submit" text="Submit" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
