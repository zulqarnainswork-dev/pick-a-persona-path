import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Check, Leaf, ListChecks, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useQuestionnaire } from './questionnaire-context';
import { questions, isValidAnswer } from '@/lib/questionnaire';
import { goals, type Gender, type GoalId } from '@/lib/goals';
import { goalImages } from '@/lib/goal-images';
import { planDays, planLevel, planStages } from '@/lib/plan';
import maleStart from '@/assets/plan-male-start.png';
import maleDay from '@/assets/plan-male-day.png';
import femaleStart from '@/assets/plan-female-start.png';
import femaleDay from '@/assets/plan-female-day.png';

export function FitnessPlan({ gender, goal }: { gender: Gender; goal: GoalId }) {
  const { answers } = useQuestionnaire();
  const complete = questions.every(question => isValidAnswer(question, answers[question.id]));
  const [progress, setProgress] = useState(1);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!complete) return;
    const interval = window.setInterval(() => setProgress(previous => Math.min(100, previous + 1)), 45);
    const finish = window.setTimeout(() => { window.clearInterval(interval); setReady(true); window.scrollTo(0, 0); }, 4900);
    return () => { window.clearInterval(interval); window.clearTimeout(finish); };
  }, [complete]);
  const selected = goals.find(item => item.id === goal);
  const level = planLevel(answers);
  const startImage = gender === 'female' ? femaleStart : maleStart;
  const dayImage = gender === 'female' ? femaleDay : maleDay;

  if (!complete) return <main className="goal-page question-page"><div className="question-complete"><h1>Complete your profile</h1><Button variant="next" asChild><Link to="/continue" search={{ gender, goal }}>Continue<ArrowRight /></Link></Button></div></main>;

  if (!ready) return <main className="plan-loading" aria-busy="true">
    <img src={startImage} alt="Your fitness coach" width={768} height={1024} />
    <h1>Preparing your journey</h1><p>{selected?.label} · {level.label}</p>
    <div className="plan-loading-number" role="progressbar" aria-label="Preparing your plan" aria-valuemin={1} aria-valuemax={100} aria-valuenow={progress}>{progress}<span>%</span></div>
    <progress className="plan-loading-track" value={progress} max={100} />
    <div className="plan-loading-checks"><span><Check />Fitness profile</span><span>{progress > 40 ? <Check /> : <span className="plan-loading-dot" />}Activity & recovery</span><span>{progress > 75 ? <Check /> : <span className="plan-loading-dot" />}30-day calendar</span></div>
  </main>;

  return <main className="plan-page">
    <header className="plan-heading"><Button variant="ghost" size="icon" asChild><Link to="/continue/$step" params={{ step: 'time' }} search={{ gender, goal }} aria-label="Review workout time" title="Review workout time"><ArrowLeft /></Link></Button><span>YOUR FITNESS JOURNEY</span></header>
    <h1>{selected?.label}<span>30-day plan</span></h1>
    <section className="plan-summary" aria-label="Your plan overview">
      <div className="plan-summary-copy"><div className="plan-intensity" aria-label={`${level.label} fitness level`}>{[1, 2, 3].map(value => <Zap key={value} className={value <= level.intensity ? 'is-active' : ''} />)}</div><h2>{level.label}</h2><div className="plan-finished"><span>0% Finished</span><progress value={0} max={30} aria-label="Plan completion" /></div></div>
      <img src={goalImages[gender][goal]} alt={`${selected?.label} fitness character`} width={384} height={512} />
    </section>
    {planStages.map((stage, index) => <section className="plan-stage" key={stage} aria-label={`Stage ${index + 1}`}><h2>Stage {index + 1}<span>{stage}</span></h2>
      <ol className="plan-timeline">{planDays.filter(day => day.stage === index + 1).map(({ day, rest }) => <li className={`plan-day-row ${day === 1 ? 'is-current' : ''}`} key={day}>
        <span className="plan-timeline-dot" aria-hidden="true" />
        <article className={`plan-day ${day === 1 ? 'plan-day-current' : ''} ${rest ? 'plan-day-rest' : ''}`} aria-label={`Day ${day}${rest ? ', rest day' : ''}`}>
          <div className="plan-day-copy"><h3>Day {day}</h3><p>{rest ? 'Rest & recharge' : day === 1 ? 'Let’s get started' : 'Workout day'}</p>{rest && <Leaf className="plan-rest-leaf" aria-hidden="true" />}</div>
          <img src={day === 1 || (!rest && day % 3 === 0) ? startImage : dayImage} alt="" width={768} height={1024} loading="lazy" />
          {day === 1 && <Button variant="planStart" onClick={() => setOpen(true)}>START<span><ArrowRight /></span></Button>}
        </article>
      </li>)}</ol>
    </section>)}
    <div className="plan-end"><ListChecks /><span>Your 30-day journey</span></div>
    <Dialog open={open} onOpenChange={setOpen}><DialogContent showCloseButton={false}><DialogHeader><DialogTitle>Day 1</DialogTitle><DialogDescription>Your exercise routine is not available yet.</DialogDescription></DialogHeader><Button variant="outline" onClick={() => setOpen(false)}><X />Close</Button></DialogContent></Dialog>
  </main>;
}