"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { signOut } from "@/app/actions";

export default function AuthButton({ user }: { user: User | null }) {
  return user ? (
    <>
      <li>
        <span className="nav-link" style={{ color: "#ff9b0e" }}>
          Welcome, {user.email}!
        </span>
      </li>
      <li>
        <form action={signOut}>
          <button type="submit" className="nav-link login-link">
            Logout
          </button>
        </form>
      </li>
    </>
  ) : (
    <li>
      <Link href="/login" className="nav-link login-link">
        Login
      </Link>
    </li>
  );
}
