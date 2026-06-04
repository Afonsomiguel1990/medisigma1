export type FirstAidActivityKey =
  | "escritorio"
  | "restauracao-alimentar"
  | "industria-oficina"
  | "construcao-exterior"
  | "logistica-armazem"
  | "saude-lares"
  | "comercio-hotelaria"
  | "outro";

export type FirstAidActivity = {
  key: FirstAidActivityKey;
  label: string;
  riskLevel: "baixo" | "elevado";
};

export type FirstAidInputs = {
  activity: FirstAidActivityKey;
  people: number;
  separatedAreas: number;
};

export type FirstAidResult = {
  baseByPeople: number;
  baseByAreas: number;
  extraRisk: number;
  recommendedBoxes: number;
  mainReason: "people" | "areas" | "risk";
};

const HIGH_RISK_ACTIVITIES = new Set<FirstAidActivityKey>([
  "restauracao-alimentar",
  "industria-oficina",
  "construcao-exterior",
  "logistica-armazem",
  "saude-lares",
]);

export function isHighRiskActivity(activity: FirstAidActivityKey) {
  return HIGH_RISK_ACTIVITIES.has(activity);
}

export function calculateFirstAidBoxes(inputs: FirstAidInputs): FirstAidResult {
  const people = Math.max(0, Math.floor(inputs.people));
  const separatedAreas = Math.max(0, Math.floor(inputs.separatedAreas));
  const baseByPeople = Math.max(1, Math.ceil(people / 25));
  const baseByAreas = Math.max(1, separatedAreas);
  const extraRisk = isHighRiskActivity(inputs.activity) ? 1 : 0;
  const base = Math.max(baseByPeople, baseByAreas);
  const recommendedBoxes = base + extraRisk;

  let mainReason: FirstAidResult["mainReason"] = "people";
  if (baseByAreas > baseByPeople) {
    mainReason = "areas";
  }
  if (extraRisk > 0) {
    mainReason = "risk";
  }

  return {
    baseByPeople,
    baseByAreas,
    extraRisk,
    recommendedBoxes,
    mainReason,
  };
}

export function pluralize(value: number, singular: string, pluralLabel: string) {
  return value === 1 ? singular : pluralLabel;
}
