"use client";

import { useMemo, useRef, useState } from "react";
import type { FormEvent, ReactNode, RefObject } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Info,
  Mail,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  calculateFirstAidBoxes,
  pluralize,
  type FirstAidActivityKey,
  type FirstAidInputs,
} from "@/lib/simulador-caixas-primeiros-socorros";
import {
  activityOptions,
  buildFirstAidSummaryLines,
  contextOptions,
  COPY,
  getActivityByKey,
} from "./copy";

function toNumber(value: string) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.floor(parsed);
}

export default function SimuladorCaixasPrimeirosSocorrosClient() {
  const [inputs, setInputs] = useState<FirstAidInputs>({
    activity: "escritorio",
    people: 0,
    separatedAreas: 1,
  });
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [proposalOpen, setProposalOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const proposalRef = useRef<HTMLDivElement>(null);

  const result = useMemo(() => calculateFirstAidBoxes(inputs), [inputs]);
  const activity = getActivityByKey(inputs.activity);
  const hasInput =
    inputs.people > 0 ||
    inputs.separatedAreas > 1 ||
    inputs.activity !== "escritorio" ||
    selectedContexts.length > 0;

  const updateInput = (key: keyof FirstAidInputs, value: string) => {
    if (key === "activity") {
      setInputs((current) => ({ ...current, activity: value as FirstAidActivityKey }));
      return;
    }
    setInputs((current) => ({ ...current, [key]: toNumber(value) }));
  };

  const toggleContext = (context: string) => {
    setSelectedContexts((current) =>
      current.includes(context) ? current.filter((item) => item !== context) : [...current, context],
    );
  };

  const openProposal = () => {
    setProposalOpen(true);
    requestAnimationFrame(() => {
      proposalRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const scrollToResult = () => {
    document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleProposalSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const empresa = formData.get("empresa")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const telefone = formData.get("telefone")?.toString().trim() || "";
    const mensagem = formData.get("mensagem")?.toString().trim() || "";
    const confirmMail = formData.get("confirm_mail")?.toString() || "";

    if (!empresa || !email) {
      setFormStatus("error");
      return;
    }

    setFormStatus("loading");

    const simulatorSummary = buildFirstAidSummaryLines(inputs, result, selectedContexts);
    const payload = {
      empresa,
      telefone,
      email,
      servico: "Caixas de Primeiros Socorros",
      mensagem: [simulatorSummary, mensagem ? `\nMensagem do cliente: ${mensagem}` : ""]
        .filter(Boolean)
        .join("\n"),
      pagina: "Simulador caixas de primeiros socorros",
      fonte: "ferramentas/simulador-caixas-primeiros-socorros",
      url: typeof window !== "undefined" ? window.location.href : "",
      confirm_mail: confirmMail,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Falha ao enviar pedido");

      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          currency: "EUR",
          value: 0,
          lead_source: "simulador_caixas_primeiros_socorros",
          page_title: "Simulador caixas de primeiros socorros",
        });
      }

      setFormStatus("success");
      form.reset();
    } catch (error) {
      console.error("Erro ao enviar pedido do simulador de primeiros socorros:", error);
      setFormStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <nav
        aria-label="Navegação"
        className="container mx-auto max-w-6xl px-6 pt-6 text-sm text-gray-600 md:px-8"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-secondary hover:underline">
              {COPY.breadcrumb.home}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <li>
            <Link
              href="/blog/kit-primeiros-socorros-empresa"
              className="hover:text-secondary hover:underline"
            >
              {COPY.breadcrumb.blog}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <li className="font-medium text-gray-900" aria-current="page">
            {COPY.breadcrumb.current}
          </li>
        </ol>
      </nav>

      <section className="relative mx-4 mb-6 mt-4 overflow-hidden rounded-3xl bg-white md:mx-8 md:mb-8">
        <div className="absolute inset-0 -z-10 [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)]" />
        <div className="container mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-white px-3 py-1 text-sm font-medium text-secondary">
            <ShieldCheck className="h-4 w-4" aria-hidden />
            Ferramenta gratuita
          </div>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl">
            {COPY.hero.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-gray-700 md:text-lg">
            {COPY.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-6 pb-24 md:px-8 lg:pb-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="space-y-6">
            <Card className="rounded-2xl border-secondary/15 bg-white shadow-sm">
              <CardHeader className="px-5 pb-0 pt-5 md:px-6">
                <h2 className="text-2xl font-bold leading-tight text-gray-900">
                  {COPY.form.title}
                </h2>
              </CardHeader>
              <CardContent className="space-y-5 px-5 py-5 md:px-6">
                <div>
                  <Label htmlFor="activity">{COPY.form.activityLabel}</Label>
                  <select
                    id="activity"
                    value={inputs.activity}
                    onChange={(event) => updateInput("activity", event.target.value)}
                    className="mt-2 flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                  >
                    {activityOptions.map((option) => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1.5 text-xs text-gray-600">
                    {activity.riskLevel === "elevado"
                      ? "Este setor recebe um reforço prudente na recomendação."
                      : "Este setor usa a base por pessoas e por áreas separadas."}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <NumberField
                    id="people"
                    label={COPY.form.peopleLabel}
                    hint={COPY.form.peopleHint}
                    value={inputs.people}
                    onChange={(value) => updateInput("people", value)}
                    icon={<Users className="h-4 w-4" aria-hidden />}
                  />
                  <NumberField
                    id="separatedAreas"
                    label={COPY.form.areasLabel}
                    hint={COPY.form.areasHint}
                    value={inputs.separatedAreas}
                    onChange={(value) => updateInput("separatedAreas", value)}
                    icon={<MapPin className="h-4 w-4" aria-hidden />}
                  />
                </div>

                <ContextSection selectedContexts={selectedContexts} toggleContext={toggleContext} />
              </CardContent>
            </Card>

            <InfoCard />
          </div>

          <ResultsColumn
            result={result}
            activityLabel={activity.label}
            openProposal={openProposal}
            proposalOpen={proposalOpen}
            proposalRef={proposalRef}
            formStatus={formStatus}
            handleProposalSubmit={handleProposalSubmit}
          />
        </div>
      </section>

      {hasInput ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white p-3 shadow-lg lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-gray-500">{COPY.result.totalLabel}</p>
              <p className="text-lg font-bold text-gray-900" aria-live="polite">
                {result.recommendedBoxes} {pluralize(result.recommendedBoxes, "caixa", "caixas")}
              </p>
            </div>
            <Button
              type="button"
              size="sm"
              onClick={scrollToResult}
              className="shrink-0 bg-secondary text-white hover:bg-secondary/90"
            >
              Ver recomendação
            </Button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function NumberField({
  id,
  label,
  hint,
  value,
  onChange,
  icon,
}: {
  id: string;
  label: string;
  hint: string;
  value: number;
  onChange: (value: string) => void;
  icon: ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id} className="flex items-center gap-2">
        <span className="text-secondary">{icon}</span>
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        min={0}
        inputMode="numeric"
        placeholder="0"
        value={value === 0 ? "" : value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-10 bg-white"
      />
      <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{hint}</p>
    </div>
  );
}

function ContextSection({
  selectedContexts,
  toggleContext,
}: {
  selectedContexts: string[];
  toggleContext: (context: string) => void;
}) {
  return (
    <div>
      <div className="mb-3">
        <Label>{COPY.form.contextTitle}</Label>
        <p className="mt-1 text-sm text-gray-600">{COPY.form.contextSubtitle}</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {contextOptions.map((context) => {
          const active = selectedContexts.includes(context);
          return (
            <button
              key={context}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => toggleContext(context)}
              className={cn(
                "flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm transition",
                active
                  ? "border-secondary/40 bg-secondary/10 text-gray-900"
                  : "border-gray-200 bg-white text-gray-700 hover:border-secondary/30",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                  active ? "border-secondary bg-secondary text-white" : "border-gray-300",
                )}
                aria-hidden
              >
                {active ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}
              </span>
              <span className="font-medium">{context}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ResultsColumn({
  result,
  activityLabel,
  openProposal,
  proposalOpen,
  proposalRef,
  formStatus,
  handleProposalSubmit,
}: {
  result: ReturnType<typeof calculateFirstAidBoxes>;
  activityLabel: string;
  openProposal: () => void;
  proposalOpen: boolean;
  proposalRef: RefObject<HTMLDivElement | null>;
  formStatus: "idle" | "loading" | "success" | "error";
  handleProposalSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="space-y-6 lg:sticky lg:top-28" id="resultado">
      <Card className="rounded-2xl border-secondary/15 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-3 text-lg">
            <span>{COPY.result.title}</span>
            <span className="rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-sm font-semibold text-gray-900">
              {activityLabel}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-xl bg-secondary p-5 text-white">
            <div className="text-sm text-white/80">{COPY.result.totalLabel}</div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-5xl font-bold" aria-live="polite">
                {result.recommendedBoxes}
              </span>
              <span className="pb-2 text-sm text-white/80">
                {pluralize(result.recommendedBoxes, "caixa", "caixas")}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/90">
              {COPY.result.reasons[result.mainReason]}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <ResultMetric label={COPY.result.basePeopleLabel} value={result.baseByPeople} />
            <ResultMetric label={COPY.result.baseAreasLabel} value={result.baseByAreas} />
            <ResultMetric label={COPY.result.extraRiskLabel} value={result.extraRisk} />
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <Info className="h-4 w-4" aria-hidden />
              Nota importante
            </div>
            <p>{COPY.result.legalNote}</p>
            <p className="mt-2 text-xs text-amber-900">{COPY.result.method}</p>
          </div>

          <Button
            type="button"
            onClick={openProposal}
            className="h-auto min-h-11 w-full whitespace-normal bg-secondary py-3 text-center leading-snug text-white hover:bg-secondary/90"
          >
            {COPY.cta.primary}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </CardContent>
      </Card>

      {proposalOpen ? (
        <div ref={proposalRef}>
          <ProposalForm formStatus={formStatus} handleProposalSubmit={handleProposalSubmit} />
        </div>
      ) : null}
    </div>
  );
}

function ResultMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-accent/50 p-3">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="mt-1 text-xs leading-snug text-gray-600">{label}</div>
    </div>
  );
}

function ProposalForm({
  formStatus,
  handleProposalSubmit,
}: {
  formStatus: "idle" | "loading" | "success" | "error";
  handleProposalSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <Card className="rounded-2xl border-secondary/15 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Mail className="h-5 w-5 text-secondary" aria-hidden />
          {COPY.cta.formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleProposalSubmit}>
          <div>
            <Label htmlFor="empresa">Nome da empresa *</Label>
            <Input id="empresa" name="empresa" className="mt-2" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" className="mt-2" required />
            </div>
            <div>
              <Label htmlFor="telefone">Telefone</Label>
              <Input id="telefone" name="telefone" type="tel" className="mt-2" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="mensagem">Mensagem (opcional)</Label>
              <Textarea
                id="mensagem"
                name="mensagem"
                rows={3}
                className="mt-2"
                placeholder={COPY.cta.messagePlaceholder}
              />
            </div>
          </div>
          <div className="pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0">
            <Label htmlFor="confirm_mail">Não preencher</Label>
            <Input id="confirm_mail" name="confirm_mail" tabIndex={-1} autoComplete="off" />
          </div>
          <Button
            type="submit"
            disabled={formStatus === "loading"}
            className="h-11 w-full bg-secondary text-white hover:bg-secondary/90"
          >
            {formStatus === "loading" ? COPY.cta.submitting : COPY.cta.submit}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          {formStatus === "success" ? (
            <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              {COPY.cta.success}
            </p>
          ) : null}
          {formStatus === "error" ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-900">
              {COPY.cta.error}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}

function InfoCard() {
  return (
    <Card className="rounded-2xl border-secondary/15 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{COPY.sources.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm leading-relaxed text-gray-700">
        <p>{COPY.sources.text}</p>
        <div className="space-y-2">
          {COPY.sources.links.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-secondary hover:underline"
            >
              {source.label}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
