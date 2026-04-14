import { auth } from "@/auth";
import NavbarClient from "@/components/navbar-client";

export default async function Navbar() {
  const session = await auth();
  return <NavbarClient isAuthenticated={Boolean(session?.user)} />;
}
