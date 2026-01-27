"use client";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "../actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="submit-btn" disabled={pending}>
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}
export default function Login() {
  return (
    <div className="container">
      <div className="logo-section">
        <Image
          src="/images/logo.png"
          alt="Help Cornner Logo"
          width={500}
          height={500}
          className="logo"
          priority
        />
      </div>

      <div className="form-section">
        <form action={signIn}>
          <h2>&nbsp;Login to your account</h2>
          <div className="input-row">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              required
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>

          <p className="password-hint">
            &nbsp;&nbsp;Enter your email and password to access your account
          </p>

          <SubmitButton />
          <Link href="/register">
            <button type="button" className="login-btn">
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
