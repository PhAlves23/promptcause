"use client";

import { useState } from "react";
import { youtubeId, type MediaItem } from "@/lib/donations";
import { cn } from "@/lib/utils";

const PLACEHOLDER_BG =
  "repeating-linear-gradient(135deg, var(--paper-sunk), var(--paper-sunk) 9px, var(--line) 9px, var(--line) 10px)";

function thumbUrl(m: MediaItem): string | null {
  if (m.type === "image") return m.url;
  const id = youtubeId(m.url);
  return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}

/** Galeria do card da ONG: foto ou vídeo (YouTube) + miniaturas; clicar na foto abre preview grande. */
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

  if (media.length === 0) {
    return (
      <div
        className="mb-3.5 grid aspect-video place-items-center rounded-[6px]"
        style={{ backgroundImage: PLACEHOLDER_BG }}
      >
        <span className="font-mono text-[0.72rem] text-ink-faint">{placeholder}</span>
      </div>
    );
  }

  const current = media[Math.min(active, media.length - 1)];
  const videoId = current.type === "video" ? youtubeId(current.url) : null;

  return (
    <>
      <div className="mb-3.5">
        <div className="aspect-video overflow-hidden rounded-[6px] bg-paper-sunk">
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
        </div>

        {media.length > 1 && (
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

      {/* Lightbox — preview grande da foto */}
      {zoom && current.type === "image" && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 sm:p-8"
          onClick={() => setZoom(false)}
          role="presentation"
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25"
            onClick={() => setZoom(false)}
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.url}
            alt={nome}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[92vw] rounded-md object-contain shadow-2xl"
          />
        </div>
      )}
    </>
  );
}
