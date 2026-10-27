import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Play,
  Plus,
  X,
} from "lucide-react";
import { gallery } from "../config/business";

export default function Gallery() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const current = gallery[index];
  const change = (delta: number) =>
    setIndex((value) => (value + delta + gallery.length) % gallery.length);
  return (
    <>
      <div className="gallery-grid">
        {gallery.map((item, i) => (
          <figure
            className={`gallery-item gallery-item-${i}`}
            key={item.src}
            data-reveal
          >
            <button
              className="gallery-image"
              aria-label={`Ampliar: ${item.label}`}
              onClick={() => {
                setIndex(i);
                dialog.current?.showModal();
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={i === 1 ? 360 : 1122}
                height={i === 1 ? 640 : 1402}
              />
              <span className="gallery-expand">
                {item.video ? (
                  <Play size={20} aria-hidden="true" />
                ) : (
                  <Plus size={20} aria-hidden="true" />
                )}
              </span>
            </button>
            <figcaption>
              <span>{item.category}</span>
              <a href={item.source} target="_blank" rel="noopener noreferrer">
                {item.label}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Galeria de fotos e publicações"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            event.preventDefault();
            change(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            change(-1);
          }
        }}
      >
        <div className="lightbox-content">
          <button
            className="icon-button lightbox-close"
            aria-label="Fechar galeria"
            onClick={() => dialog.current?.close()}
          >
            <X />
          </button>
          <img src={current.src} alt={current.alt} />
          <div className="lightbox-bottom">
            <button
              className="icon-button"
              aria-label="Imagem anterior"
              onClick={() => change(-1)}
            >
              <ArrowLeft />
            </button>
            <a href={current.source} target="_blank" rel="noopener noreferrer">
              {current.video
                ? "Assistir ao vídeo no Instagram"
                : "Ver publicação original"}{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <button
              className="icon-button"
              aria-label="Próxima imagem"
              onClick={() => change(1)}
            >
              <ArrowRight />
            </button>
          </div>
          <span className="sr-only" aria-live="polite">
            Imagem {index + 1} de {gallery.length}: {current.label}
          </span>
        </div>
      </dialog>
    </>
  );
}
