import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { goals, validateGender, validateGoal, type GoalId } from "@/lib/goals";
import { goalImages } from "@/lib/goal-images";

export const Route = createFileRoute("/next")({
  validateSearch: (search: Record<string, unknown>) => ({ gender: validateGender(search['gender']), goal: validateGoal(search['goal']) }),
  head: () => ({ meta: [
    { title: "Choose Your Goal — Fitness Journey" },
    { name: "description", content: "Choose your main fitness goal, from building strength and losing weight to flexibility and better posture." },
    { property: "og:title", content: "Choose Your Goal — Fitness Journey" },
    { property: "og:description", content: "Choose a personal goal for your fitness journey." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: NextPage,
});

function NextPage() {
  const { gender, goal } = Route.useSearch();
  const [selected, setSelected] = useState<GoalId | undefined>(goal);
  const navigate = useNavigate();
  return (
    <main className="goal-page">
      <header className="goal-header">
        <Button variant="ghost" size="icon" className="goal-back" asChild>
          <Link to="/" aria-label="Go back" title="Go back"><ArrowLeft /></Link>
        </Button>
        <div className="goal-step"><span>01</span> GOAL</div>
        <div className="goal-progress" role="progressbar" aria-label="Your fitness journey" aria-valuemin={0} aria-valuemax={100} aria-valuenow={14}><span /></div>
      </header>
      <div className="goal-intro">
        <h1>What is your main<br />target?</h1>
        <p>Find a plan catering to your main target</p>
      </div>
      <div className="goal-options" role="group" aria-label="Choose your main fitness goal">
        {goals.map((item, index) => (
          <Button key={item.id} variant="goal" size="goal" aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}>
            <span className="goal-label">{item.label}</span>
            <img className="goal-art" src={goalImages[gender][item.id]} alt="" width={384} height={512} loading={index < 3 ? "eager" : "lazy"} />
            {selected === item.id && <span className="goal-selected"><Check aria-hidden="true" /></span>}
          </Button>
        ))}
      </div>
      <footer className="goal-footer">
        <Button variant="next" disabled={!selected} onClick={() => {
          if (!selected) return;
          void navigate({ to: "/continue", search: { gender, goal: selected } });
        }}>Next</Button>
      </footer>
    </main>
  );
}