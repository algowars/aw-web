import { Button } from "@/components/ui/button";
import { routerConfig } from "@/router-config";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <article className="flex flex-col items-center gap-5 px-3 py-34 text-center">
        <h1 className="text-3xl font-bold md:text-4xl lg:text-6xl">
          Battle against other Developers in
          <br /> Fast-Paced Coding Challenges
        </h1>
        <p className="text-muted-foreground max-w-md max-[420px]:text-sm md:max-w-lg lg:max-w-2xl">
          Solve as many challenges as you can within the allotted time. Compete
          with your peers, collaborate, and communicate with other developers in
          real time.
        </p>
        <ul className="flex w-full items-center justify-center gap-3 max-[520px]:flex-col">
          <li className="w-full sm:w-fit">
            <Button size="lg" asChild>
              <Link href={routerConfig.signup.path} className="w-28">
                Get Started
              </Link>
            </Button>
          </li>
          <li className="w-full sm:w-fit">
            <Button size="lg" variant="secondary" asChild>
              <Link href={routerConfig.about.path} className="w-28">
                Learn More
              </Link>
            </Button>
          </li>
        </ul>
      </article>
    </section>
  );
}
