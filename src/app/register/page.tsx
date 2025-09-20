"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_name: username,
          user_number: mobile,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (user) {
      // Also insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          user_name: username,
          user_number: mobile,
          user_role: "user",
        },
      ]);

      if (profileError) {
        setError(profileError.message);
      } else {
        setSuccess(
          "Registration successful! Please check your email to confirm your account."
        );
      }
    }
  };

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
        <form onSubmit={handleRegister}>
          <h2>&nbsp;Create an account</h2>

          {error && (
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
              <strong style={{ color: "#721c24" }}>✗</strong> {error}
            </div>
          )}

          {success && (
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
              <strong style={{ color: "#155724" }}>✓</strong> {success}
            </div>
          )}

          <div className="input-row">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Mobile Number"
              required
            />
          </div>
          <div className="input-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
            />
          </div>
          <div className="input-row">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>

          <p className="password-hint">
            &nbsp;&nbsp;Use 8 or more characters with a mix of letters, numbers
            & symbols
          </p>

          <button type="submit" className="submit-btn">
            Create an account
          </button>
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
