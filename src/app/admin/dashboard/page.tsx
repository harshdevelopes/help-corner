import createSupabaseServerClient from "@/utils/supabase-server";
import DashboardView from "./DashboardView";

async function getDashboardData() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, users: [], admins: [], services: [] };
  }

  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*");

  const { data: services, error: servicesError } = await supabase
    .from("hc_services")
    .select("*");

  if (usersError || servicesError) {
    console.error(
      "Error fetching dashboard data:",
      usersError || servicesError
    );
  }

  return {
    user,
    users: users || [],
    services: services || [],
  };
}

export default async function DashboardPage() {
  const { user, users, services } = await getDashboardData();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>You must be logged in to view this page.</p>
      </div>
    );
  }

  return (
    <DashboardView
      user={user}
      initialUsers={users}
      initialServices={services}
    />
  );
}

export const revalidate = 0;
