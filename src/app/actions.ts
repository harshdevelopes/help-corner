"use server";

import { redirect } from "next/navigation";
import createSupabaseServerClient from "@/utils/supabase-server";

export async function signOut() {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
