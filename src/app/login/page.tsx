import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/utils/supabase-server";

import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createSupabaseServerClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("user_role")
        .eq("id", user.id)
        .single();

      if (profile?.user_role === "admin") {
        return redirect("/admin/dashboard");
      }
    }

    return redirect("/");
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

          <button type="submit" className="submit-btn">
            Login
          </button>
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
