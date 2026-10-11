import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/next")({
  validateSearch: (search: Record<string, unknown>): { gender: "male" | "female" } => ({ gender: search.gender === "female" ? "female" : "male" }),
  head: () => ({ meta: [
    { title: "Your Selection — Fitness Journey" },
    { name: "description", content: "Your selected fitness profile." },
    { property: "og:title", content: "Your Selection — Fitness Journey" },
    { property: "og:description", content: "Your selected fitness profile." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: NextPage,
});

function NextPage() {
  const { gender } = Route.useSearch();
  return <main className="onboarding-page next-page">
    <Button variant="ghost" size="icon" asChild><Link to="/" aria-label="Go back" title="Go back"><ArrowLeft /></Link></Button>
    <div className="selection-confirmation"><Check aria-hidden="true" /><h1>{gender === "female" ? "Female" : "Male"}</h1></div>
  </main>;
}