import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { goals, validateGender, validateGoal } from "@/lib/goals";

export const Route = createFileRoute("/continue")({
  validateSearch: (search: Record<string, unknown>) => ({
    gender: validateGender(search['gender']),
    goal: validateGoal(search['goal']) ?? "abs",
  }),
  head: () => ({ meta: [
    { title: "Your Fitness Goal — Fitness Journey" },
    { name: "description", content: "Your chosen goal for the next step of your personal fitness journey." },
    { property: "og:title", content: "Your Fitness Goal — Fitness Journey" },
    { property: "og:description", content: "Your chosen personal fitness goal." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ContinuePage,
});

function ContinuePage() {
  const { gender, goal } = Route.useSearch();
  const selected = goals.find(item => item.id === goal);
  return <main className="onboarding-page next-page">
    <Button variant="ghost" size="icon" asChild><Link to="/next" search={{ gender, goal }} aria-label="Go back" title="Go back"><ArrowLeft /></Link></Button>
    <div className="selection-confirmation"><Check aria-hidden="true" /><h1>{selected?.label}</h1></div>
  </main>;
}