import type { CaseId, Personalization } from "../../shared/content";

export interface Me {
  displayName: string | null;
  caseId: CaseId | null;
  cohortCode: string | null;
  personalization: Personalization;
  progress: { module_id: string; step: number; completed_at: string | null }[];
  deliverables: { module_id: string; version: number; updated_at: string }[];
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "same-origin",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as { error?: string }).error ?? `Error ${res.status}`);
  return data as T;
}

export const api = {
  me: () => request<Me>("/me"),
  saveCase: (caseId: CaseId, personalization: Personalization, displayName?: string) =>
    request<{ ok: true }>("/me/case", { method: "PUT", body: JSON.stringify({ caseId, personalization, displayName }) }),
  saveProgress: (moduleId: string, step: number, completed = false) =>
    request<{ ok: true }>(`/progress/${moduleId}`, { method: "PUT", body: JSON.stringify({ step, completed }) }),
  getDeliverable: (moduleId: string) =>
    request<{ content: string; version: number; updated_at: string }>(`/deliverables/${moduleId}`),
  saveDeliverable: (moduleId: string, content: string) =>
    request<{ ok: true }>(`/deliverables/${moduleId}`, { method: "PUT", body: JSON.stringify({ content }) }),
};
