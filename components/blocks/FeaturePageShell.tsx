import Link from "next/link";
import { type LucideIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/blocks/Footer";
import { Button } from "@/components/ui/button";

type FeatureMetric = {
  label: string;
  value: string;
  detail: string;
};

type FeatureCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type FeatureStep = {
  title: string;
  description: string;
};

type FeaturePageShellProps = {
  badge: string;
  badgeIcon: LucideIcon;
  title: string;
  highlight: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  theme: {
    surface: string;
    border: string;
    text: string;
    button: string;
    buttonHover: string;
    soft: string;
  };
  metrics: FeatureMetric[];
  cards: FeatureCard[];
  steps: FeatureStep[];
  outcomes: string[];
};

export function FeaturePageShell({
  badge,
  badgeIcon: BadgeIcon,
  title,
  highlight,
  description,
  primaryAction,
  secondaryAction,
  theme,
  metrics,
  cards,
  steps,
  outcomes,
}: FeaturePageShellProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <section className="relative overflow-hidden border-b border-border/60 pt-28 pb-16">
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.surface}`} />
        <div className="absolute left-1/2 top-16 h-[340px] w-[740px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

        <div className="container relative mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm ${theme.border} ${theme.soft}`}>
              <BadgeIcon className="h-4 w-4" />
              <span>{badge}</span>
            </div>

            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              {title} <span className={theme.text}>{highlight}</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-muted-foreground md:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" className={`${theme.button} ${theme.buttonHover} h-11 px-8 text-white`}>
                {primaryAction}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className={`h-11 px-8 ${theme.border}`}>
                {secondaryAction}
              </Button>
            </div>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <article key={metric.label} className={`rounded-2xl border bg-card/70 p-5 backdrop-blur ${theme.border}`}>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{metric.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className={`group rounded-2xl border bg-card/70 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1 ${theme.border}`}
            >
              <div className={`mb-4 inline-flex rounded-xl p-2.5 ${theme.soft}`}>
                <card.icon className={`h-5 w-5 ${theme.text}`} />
              </div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container mx-auto grid gap-8 px-4 pb-16 md:grid-cols-2 md:px-6">
        <article className={`rounded-2xl border bg-card/70 p-6 backdrop-blur ${theme.border}`}>
          <h2 className="text-xl font-semibold">How It Flows</h2>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex gap-3">
                <span className={`mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${theme.soft} ${theme.text}`}>
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={`rounded-2xl border bg-card/70 p-6 backdrop-blur ${theme.border}`}>
          <h2 className="text-xl font-semibold">What You Unlock</h2>
          <div className="mt-6 space-y-3">
            {outcomes.map((outcome) => (
              <div key={outcome} className="flex items-start gap-3">
                <CheckCircle2 className={`mt-0.5 h-5 w-5 shrink-0 ${theme.text}`} />
                <p className="text-sm text-muted-foreground">{outcome}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link href="/" className={`inline-flex items-center text-sm font-medium transition-colors ${theme.text}`}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Home
            </Link>
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}