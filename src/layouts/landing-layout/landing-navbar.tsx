import { Button } from "@/components/ui/button";
import { routerConfig } from "@/router-config";
import { auth, signOut } from "@/server/auth";
import { ModeToggle } from "@/theme/mode-toggle";
import Link from "next/link";

export default async function LandingNavbar() {
  const session = await auth();
  const isAuthenticated = !!session;

  const defaultNavLinks = [
    { name: "Home", path: routerConfig.home.path },
    { name: "Problems", path: routerConfig.problems.path },
    { name: "Leaderboards", path: routerConfig.leaderboards.path },
  ];

  const authenticatedLinks = [
    {
      name: "Log Out",
      element: (
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button variant="default" size="lg" type="submit">
            Log Out
          </Button>
        </form>
      ),
    },
  ];

  const unauthenticatedLinks = [
    {
      name: "Log In",
      element: (
        <Button size="lg" asChild>
          <Link href={routerConfig.login.path}>Log In</Link>
        </Button>
      ),
    },
    {
      name: "Sign Up",
      element: (
        <Link
          href={routerConfig.signup.path}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign Up
        </Link>
      ),
    },
  ];

  const navLinks = isAuthenticated ? authenticatedLinks : unauthenticatedLinks;

  return (
    <nav className="py-4">
      <div className="container mx-auto grid grid-cols-3 gap-4">
        <Link
          href={routerConfig.home.path}
          className="col-span-1 justify-self-start font-bold tracking-tight uppercase"
        >
          Algowars
        </Link>
        <ul className="col-span-1 flex items-center justify-center gap-8">
          {defaultNavLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.path}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="col-span-1 flex items-center justify-end gap-6">
          {navLinks.map((link) => (
            <li key={link.name}>{link.element}</li>
          ))}
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
