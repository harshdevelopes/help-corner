import createSupabaseServerClient from "@/utils/supabase-server";
import Link from "next/link";
import Image from "next/image";
import AuthButton from "./AuthButton";

export default async function Header() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Image
            src="/images/icon.png"
            alt="Help Cornner Logo"
            width={50}
            height={50}
            className="header-logo"
          />
          <h1 className="company-name">Help Cornner</h1>
        </div>
        <nav className="header-nav">
          <ul className="nav-menu">
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#services" className="nav-link">
                Services
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="nav-link">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/#about" className="nav-link">
                About Us
              </Link>
            </li>
            <AuthButton user={user} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
