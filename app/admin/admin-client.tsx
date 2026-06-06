"use client";

import { useActionState } from "react";
import {
  createOng,
  updateOng,
  toggleOng,
  addDoacao,
  addRepasse,
  logout,
  type ActionState,
} from "./actions";

export type AdminOng = {
  id: string;
  slug: string;
  nome: string;
  regiaoUf: string;
  descricao: string;
  linkDoacao: string;
  gateway: string;
  hasSecret: boolean;
  ativo: boolean;
};

const GATEWAYS = ["manual", "asaas", "mercadopago", "stripe"];
const input =
  "w-full rounded-[10px] border border-line-strong bg-paper-card px-3 py-2.5 text-sm outline-none focus:border-green focus:ring-2 focus:ring-green/40";
const label = "mb-1 block text-xs font-medium text-ink-soft";
const card = "rounded-[16px] border border-line bg-paper-card p-6";
const btn =
  "h-10 rounded-full bg-clay px-5 text-sm font-semibold text-white shadow-[0_2px_0_var(--clay-deep)] hover:bg-clay-deep disabled:opacity-50";

function Feedback({ state }: { state: ActionState }) {
  if (state.error) return <p className="mt-2 text-sm font-medium text-red-600">{state.error}</p>;
  if (state.ok) return <p className="mt-2 text-sm font-medium text-green-deep">✓ Salvo.</p>;
  return null;
}

export function AdminClient({ ongs, totalReais }: { ongs: AdminOng[]; totalReais: number }) {
  return (
    <div className="mx-auto max-w-[1100px] px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Admin · PromptCause</h1>
          <p className="text-sm text-ink-soft">
            Total doado: <b className="font-mono">R$ {totalReais.toLocaleString("pt-BR")}</b> · {ongs.length} ONG(s)
          </p>
        </div>
        <form action={logout}>
          <button className="rounded-full border border-line-strong px-4 py-2 text-sm font-medium hover:bg-paper-sunk">
            Sair
          </button>
        </form>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <NewOngForm />
        <div className="flex flex-col gap-6">
          <AddDoacaoForm ongs={ongs} />
          <AddRepasseForm ongs={ongs} />
        </div>
      </div>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-lg font-semibold">ONGs cadastradas</h2>
        <div className="flex flex-col gap-3">
          {ongs.map((o) => (
            <OngRow key={o.id} ong={o} />
          ))}
          {ongs.length === 0 && <p className="text-sm text-ink-soft">Nenhuma ONG ainda. Cadastre ao lado.</p>}
        </div>
      </section>
    </div>
  );
}

function NewOngForm() {
  const [state, action, pending] = useActionState(createOng, {});
  return (
    <section className={card}>
      <h2 className="mb-4 font-display text-lg font-semibold">Nova ONG</h2>
      <form action={action} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Nome *</label>
            <input name="nome" className={input} required />
          </div>
          <div>
            <label className={label}>UF</label>
            <input name="regiaoUf" maxLength={2} placeholder="SP" className={input} />
          </div>
        </div>
        <div>
          <label className={label}>Slug (opcional — gerado do nome)</label>
          <input name="slug" placeholder="instituto-conectar" className={input} />
        </div>
        <div>
          <label className={label}>Descrição</label>
          <textarea name="descricao" rows={2} className={input} />
        </div>
        <div>
          <label className={label}>Link de doação *</label>
          <input name="linkDoacao" type="url" placeholder="https://…" className={input} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Gateway (webhook)</label>
            <select name="gateway" defaultValue="manual" className={input}>
              {GATEWAYS.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Webhook secret</label>
            <input name="webhookSecret" placeholder="(se houver webhook)" className={input} />
          </div>
        </div>
        <div className="mt-1 flex items-center gap-3">
          <button className={btn} disabled={pending}>
            {pending ? "Salvando…" : "Cadastrar ONG"}
          </button>
          <Feedback state={state} />
        </div>
      </form>
    </section>
  );
}

function AddDoacaoForm({ ongs }: { ongs: AdminOng[] }) {
  const [state, action, pending] = useActionState(addDoacao, {});
  return (
    <section className={card}>
      <h2 className="mb-1 font-display text-lg font-semibold">Lançar doação (manual)</h2>
      <p className="mb-4 text-xs text-ink-soft">Soma no contador. Use quando a ONG reportar o valor recebido.</p>
      <form action={action} className="flex flex-col gap-3">
        <OngSelect ongs={ongs} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Valor (R$) *</label>
            <input name="valor" type="number" step="0.01" min="0.01" className={input} required />
          </div>
          <div>
            <label className={label}>Período</label>
            <input name="periodo" placeholder="maio/26" className={input} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className={btn} disabled={pending}>
            {pending ? "Salvando…" : "Lançar doação"}
          </button>
          <Feedback state={state} />
        </div>
      </form>
    </section>
  );
}

function AddRepasseForm({ ongs }: { ongs: AdminOng[] }) {
  const [state, action, pending] = useActionState(addRepasse, {});
  return (
    <section className={card}>
      <h2 className="mb-1 font-display text-lg font-semibold">Registrar repasse (ledger)</h2>
      <p className="mb-4 text-xs text-ink-soft">Aparece no razão público da página “A Causa”.</p>
      <form action={action} className="flex flex-col gap-3">
        <OngSelect ongs={ongs} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={label}>Valor (R$) *</label>
            <input name="valor" type="number" step="0.01" min="0.01" className={input} required />
          </div>
          <div>
            <label className={label}>Período *</label>
            <input name="periodo" placeholder="maio/26" className={input} required />
          </div>
        </div>
        <div>
          <label className={label}>Comprovante (URL)</label>
          <input name="comprovanteUrl" type="url" placeholder="https://…" className={input} />
        </div>
        <div className="flex items-center gap-3">
          <button className={btn} disabled={pending}>
            {pending ? "Salvando…" : "Registrar repasse"}
          </button>
          <Feedback state={state} />
        </div>
      </form>
    </section>
  );
}

function OngSelect({ ongs }: { ongs: AdminOng[] }) {
  return (
    <div>
      <label className={label}>ONG *</label>
      <select name="ongId" className={input} required defaultValue="">
        <option value="" disabled>
          Selecione…
        </option>
        {ongs.map((o) => (
          <option key={o.id} value={o.id}>
            {o.nome}
          </option>
        ))}
      </select>
    </div>
  );
}

function OngRow({ ong }: { ong: AdminOng }) {
  const [state, action, pending] = useActionState(updateOng, {});
  return (
    <div className={`${card} p-4`}>
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="font-semibold">{ong.nome}</span>
          <span className="ml-2 font-mono text-xs text-ink-faint">{ong.slug}</span>
          <span className="ml-2 rounded-full bg-paper-sunk px-2 py-0.5 text-xs text-ink-soft">{ong.gateway}</span>
          {!ong.ativo && <span className="ml-2 text-xs font-medium text-red-600">inativa</span>}
        </div>
        <form action={toggleOng}>
          <input type="hidden" name="id" value={ong.id} />
          <button className="rounded-full border border-line-strong px-3 py-1.5 text-xs font-medium hover:bg-paper-sunk">
            {ong.ativo ? "Desativar" : "Ativar"}
          </button>
        </form>
      </div>

      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-green-deep">Editar</summary>
        <form action={action} className="mt-3 flex flex-col gap-3">
          <input type="hidden" name="id" value={ong.id} />
          <input type="hidden" name="slug" value={ong.slug} />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Nome *</label>
              <input name="nome" defaultValue={ong.nome} className={input} required />
            </div>
            <div>
              <label className={label}>UF</label>
              <input name="regiaoUf" defaultValue={ong.regiaoUf} maxLength={2} className={input} />
            </div>
          </div>
          <div>
            <label className={label}>Descrição</label>
            <textarea name="descricao" defaultValue={ong.descricao} rows={2} className={input} />
          </div>
          <div>
            <label className={label}>Link de doação *</label>
            <input name="linkDoacao" type="url" defaultValue={ong.linkDoacao} className={input} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Gateway</label>
              <select name="gateway" defaultValue={ong.gateway} className={input}>
                {GATEWAYS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Webhook secret {ong.hasSecret && "(definido)"}</label>
              <input name="webhookSecret" placeholder={ong.hasSecret ? "deixe vazio p/ manter" : ""} className={input} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className={btn} disabled={pending}>
              {pending ? "Salvando…" : "Salvar alterações"}
            </button>
            <Feedback state={state} />
          </div>
        </form>
      </details>
    </div>
  );
}
