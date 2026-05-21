import React from 'react'

export function TailwindTestPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-4 py-8">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-card/90 p-8 shadow-card backdrop-blur-xl">
        <div className="mb-8 flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">UI / Tailwind validation</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">Tailwind test page</h1>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground">
              This page verifies the Tailwind + PostCSS pipeline and custom design tokens in the frontend app.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-background/90 p-5 shadow-soft">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Primary</p>
              <div className="mt-4 rounded-3xl bg-brand px-4 py-6 text-primary-foreground shadow-soft">Primary CTA</div>
            </div>
            <div className="rounded-3xl border border-border bg-background/90 p-5 shadow-soft">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Accent</p>
              <div className="mt-4 rounded-3xl bg-accent px-4 py-6 text-accent-foreground shadow-soft">Accent CTA</div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <article className="rounded-3xl border border-border bg-background/90 p-6 shadow-soft">
              <h2 className="text-2xl font-semibold">Typography check</h2>
              <p className="mt-3 text-base leading-7 text-muted-foreground">
                Paragraph text should render with the custom font stack and color variables.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground">
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                  Tailwind classes compile correctly
                </li>
                <li className="flex items-center gap-2">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  CSS custom properties are applied
                </li>
              </ul>
            </article>

            <article className="rounded-3xl border border-border bg-background/90 p-6 shadow-soft">
              <h2 className="text-2xl font-semibold">Interactive example</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-brand/90">
                  Button
                </button>
                <button className="inline-flex items-center justify-center rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary">
                  Secondary
                </button>
              </div>
            </article>
          </div>

          <section className="rounded-3xl border border-border bg-slate-50/90 p-6 shadow-soft dark:bg-slate-950/80">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
              Tailwind v4
            </div>
            <h2 className="text-2xl font-semibold">Responsive grid</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {['One', 'Two', 'Three', 'Four'].map((item) => (
                <div key={item} className="rounded-3xl border border-border bg-background/95 p-4 text-sm text-foreground shadow-soft">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}
