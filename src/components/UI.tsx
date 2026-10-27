import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { whatsapp } from "../config/business";

export function Cta({
  children = "Agendar minha consulta",
  subject,
  light = false,
  className = "",
}: {
  children?: ReactNode;
  subject?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      href={whatsapp(subject)}
      target="_blank"
      rel="noopener noreferrer"
      className={`button ${light ? "button-light" : ""} ${className}`}
    >
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
export function Label({
  children,
  number,
}: {
  children: ReactNode;
  number?: string;
}) {
  return (
    <div className="eyebrow">
      {number && <span className="section-number">{number}</span>}
      <span>{children}</span>
    </div>
  );
}
export function Brand({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand ${className}`}
      src="/images/logo-silvia-transparent.png"
      alt="Silvia Cavalcante — Nutricionista"
      width="1630"
      height="965"
    />
  );
}
