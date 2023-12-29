"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [createdUser, setCreatedUser] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setCreatedUser(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setCreatedUser(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl">Register</h1>
      {createdUser && (
        <div className="block text-center mt-4 text-green-400">
          User created. <br />
          Now you can{" "}
          <Link href={"/login"} className="underline">
            Login
          </Link>
        </div>
      )}
      {error && (
        <div className="block text-center mt-4 text-red-400 underline">
          An error occured <br />
          Please try later
        </div>
      )}
      <form className="block max-w-xs mx-auto mt-4" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={creatingUser}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="text-center text-gray-500 pt-4 my-4 border-t">
          Existing account?{" "}
          <Link href={"/login"} className="underline">
            Login here
          </Link>
        </div>
      </form>
    </section>
  );
}
