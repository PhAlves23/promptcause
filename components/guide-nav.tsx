import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Left rail: navigation between guide pages (one per category). */
export function GuideNav({
  parts,
  activeId,
  title,
}: {
  parts: { id: string; title: string }[];
  activeId?: string;
  title: string;
}) {
  return (
    <aside className="sticky top-[92px] hidden max-h-[calc(100vh-110px)] self-start overflow-y-auto lg:block">
      <div className="mb-4 rounded-[10px] border border-line bg-paper-card px-3.5 py-3">
        <Link href="/aprender" className="text-[0.92rem] font-semibold hover:text-green">
          {title}
        </Link>
        <div className="font-mono text-[0.7rem] text-ink-faint">prompt engineering · v1.0</div>
      </div>
      <nav className="border-l border-line">
        {parts.map((p) => (
          <Link
            key={p.id}
            href={`/aprender/${p.id}`}
            aria-current={p.id === activeId ? "page" : undefined}
            className={cn(
              "-ml-px block border-l-2 py-1.5 pl-3.5 text-[0.9rem]",
              p.id === activeId
                ? "border-green bg-green-tint font-semibold text-green"
                : "border-transparent text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            {p.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
