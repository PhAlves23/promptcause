"use client";

import { useActionState } from "react";
import { login, type ActionState } from "../actions";

const initial: ActionState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, initial);

  return (
    <main className="grid min-h-screen place-items-center px-6">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-[16px] border border-line bg-paper-card p-8 shadow-[0_18px_50px_-16px_rgba(32,28,21,0.18)]"
      >
        <h1 className="mb-1 font-display text-2xl font-semibold">Admin · PromptCause</h1>
        <p className="mb-6 text-sm text-ink-soft">Acesso restrito ao operador.</p>

        <label className="mb-2 block text-sm font-medium" htmlFor="password">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-[10px] border border-line-strong bg-paper-card px-3.5 py-3 text-base outline-none focus:border-green focus:ring-2 focus:ring-green/40"
        />

        {state.error && <p className="mt-3 text-sm font-medium text-red-600">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 h-11 w-full rounded-full bg-clay font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep disabled:opacity-50"
        >
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
