"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginProgress, setLoginProgress] = useState(false);

  async function formSubmitHandler(ev) {
    ev.preventDefault();
    setLoginProgress(true);

    await signIn("credentials", { email, password, callbackUrl: "/" });

    setLoginProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Login</h1>
      <form
        className="block max-w-xs mx-auto mt-4"
        onSubmit={formSubmitHandler}
      >
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loginProgress}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={loginProgress}
        />
        <button type="submit" disabled={loginProgress}>
          Login
        </button>
      </form>
    </section>
  );
}
