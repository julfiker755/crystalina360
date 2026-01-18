import { Button } from "@/components/ui";
import Link from "next/link";
import React from "react";

export default function NotFoundPage() {
  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center">
      <div>
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-figma-primary">
            404
          </h1>

          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            Something's missing.
          </p>

          <p className="mb-4 text-article">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page
          </p>

          <Link href={"/"}>
            <Button> Back to Homepage</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
