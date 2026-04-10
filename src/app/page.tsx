import Hero from "@/hero/hero";
import LandingLayout from "@/layouts/landing-layout/landing-layout";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <LandingLayout>
        <Hero />
      </LandingLayout>
    </HydrateClient>
  );
}
