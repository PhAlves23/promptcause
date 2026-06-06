"use client";

import { useEffect, useState } from "react";
import { youtubeId, type MediaItem } from "@/lib/donations";
import { cn } from "@/lib/utils";

const PLACEHOLDER_BG =
  "repeating-linear-gradient(135deg, var(--paper-sunk), var(--paper-sunk) 9px, var(--line) 9px, var(--line) 10px)";

function thumbUrl(m: MediaItem): string | null {
  if (m.type === "image") return m.url;
  const id = youtubeId(m.url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}

/** Galeria do card: foto/vídeo + miniaturas; abre um preview grande em carrossel (fotos e vídeos). */
export function OngMedia({
  media,
  nome,
  placeholder,
}: {
  media: MediaItem[];
  nome: string;
  placeholder: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  const count = media.length;
  const go = (dir: number) => setActive((a) => (a + dir + count) % count);

  // teclado no preview: Esc fecha, ← → navegam
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      else if (e.key === "ArrowRight" && count > 1) go(1);
      else if (e.key === "ArrowLeft" && count > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, count]);

  if (count === 0) {
    return (
      <div
        className="mb-3.5 grid aspect-video place-items-center rounded-[6px]"
        style={{ backgroundImage: PLACEHOLDER_BG }}
      >
        <span className="font-mono text-[0.72rem] text-ink-faint">{placeholder}</span>
      </div>
    );
  }

  const current = media[Math.min(active, count - 1)];
  const videoId = current.type === "video" ? youtubeId(current.url) : null;

  return (
    <>
      <div className="mb-3.5">
        <div className="group relative aspect-video overflow-hidden rounded-[6px] bg-paper-sunk">
          {current.type === "video" && videoId ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={nome}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current.url}
              alt={nome}
              onClick={() => setZoom(true)}
              className="h-full w-full cursor-zoom-in object-cover transition-transform hover:scale-[1.02]"
            />
          )}
          {/* expandir — abre o preview mesmo quando a capa é vídeo */}
          <button
            type="button"
            aria-label="Ampliar"
            onClick={() => setZoom(true)}
            className="absolute top-2 right-2 grid size-8 place-items-center rounded-md bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100"
          >
            ⤢
          </button>
        </div>

        {count > 1 && (
          <div className="mt-2 flex gap-2 overflow-x-auto">
            {media.map((m, i) => {
              const thumb = thumbUrl(m);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Mídia ${i + 1}`}
                  className={cn(
                    "relative h-12 w-16 shrink-0 overflow-hidden rounded-[4px] border",
                    i === active ? "border-green" : "border-line hover:border-ink-faint",
                  )}
                >
                  {thumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="grid h-full w-full place-items-center bg-paper-sunk text-xs">▶</span>
                  )}
                  {m.type === "video" && (
                    <span className="absolute inset-0 grid place-items-center text-white drop-shadow">▶</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Preview em carrossel — navega por fotos e vídeos */}
      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          onClick={() => setZoom(false)}
          role="presentation"
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25"
            onClick={() => setZoom(false)}
          >
            ×
          </button>

          {count > 1 && (
            <button
              type="button"
              aria-label="Anterior"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/25 sm:left-6"
            >
              ‹
            </button>
          )}

          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {current.type === "video" && videoId ? (
              <div className="aspect-video w-full overflow-hidden rounded-md bg-black">
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={nome}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={current.url}
                alt={nome}
                className="mx-auto max-h-[86vh] w-auto rounded-md object-contain shadow-2xl"
              />
            )}
          </div>

          {count > 1 && (
            <button
              type="button"
              aria-label="Próxima"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 z-10 grid size-11 place-items-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/25 sm:right-6"
            >
              ›
            </button>
          )}

          {count > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 font-mono text-xs text-white">
              {active + 1} / {count}
            </div>
          )}
        </div>
      )}
    </>
  );
}
