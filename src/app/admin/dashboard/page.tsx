import createSupabaseServerClient from "@/utils/supabase-server";
import DashboardView from "./DashboardView";

async function getDashboardData() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, users: [], admins: [], services: [], vendors: [] };
  }

  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*");

  const { data: services, error: servicesError } = await supabase
    .from("hc_services")
    .select("*");

  const { data: vendors, error: vendorsError } = await supabase
    .from("hc_vendors")
    .select("*");

  if (usersError || servicesError || vendorsError) {
    console.error(
      "Error fetching dashboard data:",
      usersError || servicesError || vendorsError
    );
  }

  return {
    user,
    users: users || [],
    services: services || [],
    vendors: vendors || [],
  };
}

export default async function DashboardPage() {
  const { user, users, services, vendors } = await getDashboardData();

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
      initialVendors={vendors}
    />
  );
}

export const revalidate = 0;
