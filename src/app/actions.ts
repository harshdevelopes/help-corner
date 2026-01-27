"use server";

import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/utils/supabase-server";

export async function signIn(formData: FormData) {
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
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const mobile = formData.get("mobile") as string;

  const supabase = await createSupabaseServerClient();

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
    return { error: error.message };
  }

  if (user) {
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
      return { error: profileError.message };
    }
  }
  return {
    success:
      "Registration successful! Please check your email to confirm your account.",
  };
}
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect("/");
}
