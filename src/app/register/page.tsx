"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { signUp } from "../actions";

const initialState = {
  error: "",
  success: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="submit-btn" disabled={pending}>
      {pending ? "Creating Account..." : "Create an account"}
    </button>
  );
}

export async function signUpAction(
  prevState: { error: string; success: string },
  formData: FormData
): Promise<{ error: string; success: string }> {
  // your logic
  const result = await signUp(formData);
  return { error: result.error || "", success: result.success || "" };
}

export default function Register() {
  const [state, formAction] = useFormState(signUpAction, initialState);

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
        <form action={formAction}>
          <h2>&nbsp;Create an account</h2>

          {state?.error && (
            <div
              style={{
                color: "#721c24",
                backgroundColor: "#f8d7da",
                border: "1px solid #f5c6cb",
                padding: "12px",
                margin: "12px",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "15px",
                position: "relative",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong style={{ color: "#721c24" }}>✗</strong> {state.error}
            </div>
          )}

          {state?.success && (
            <div
              style={{
                color: "#155724",
                backgroundColor: "#d4edda",
                border: "1px solid #c3e6cb",
                padding: "12px",
                margin: "12px",
                borderRadius: "10px",
                textAlign: "center",
                fontSize: "15px",
                position: "relative",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <strong style={{ color: "#155724" }}>✓</strong> {state.success}
            </div>
          )}

          <div className="input-row">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              name="email"
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />
          </div>

          <p className="password-hint">
            &nbsp;&nbsp;Use 8 or more characters with a mix of letters, numbers
            & symbols
          </p>

          <SubmitButton />
          <Link href="/login">
            <button type="button" className="login-btn">
              Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}
