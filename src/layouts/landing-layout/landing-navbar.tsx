import { Button } from "@/components/ui/button";
import { routerConfig } from "@/router-config";
import { ModeToggle } from "@/theme/mode-toggle";
import Link from "next/link";

export default function LandingNavbar() {
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
          <li>
            <Link
              href={routerConfig.home.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={routerConfig.problems.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Problems
            </Link>
          </li>
          <li>
            <Link
              href={routerConfig.leaderboards.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Leaderboards
            </Link>
          </li>
        </ul>
        <ul className="col-span-1 flex items-center justify-end gap-6">
          <li>
            <Button size="lg" asChild>
              <Link href={routerConfig.login.path}>Log In</Link>
            </Button>
          </li>
          <li>
            <Link
              href={routerConfig.signup.path}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign Up
            </Link>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
