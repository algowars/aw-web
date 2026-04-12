import Hero from "@/hero/hero";
import LandingLayout from "@/layouts/landing-layout/landing-layout";
import { auth0 } from "@/lib/auth0";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth0.getSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <HydrateClient>
      <LandingLayout>
        <Hero />
      </LandingLayout>
    </HydrateClient>
  );
}
