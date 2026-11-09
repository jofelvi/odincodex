"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { scrollToSection } from "@/lib/scroll";
import { systems } from "@/data/systems";
import { useCopy, type Bilingual } from "@/i18n/useCopy";

const COPY: Bilingual<{
  tagline: string;
  systemsTitle: string;
  studioTitle: string;
  links: { id: string; label: string }[];
  guides: string;
  rights: string;
}> = {
  es: {
    tagline: "Sistemas de gestión con tu marca, y software a medida cuando hace falta.",
    systemsTitle: "Sistemas",
    studioTitle: "Estudio",
    links: [
      { id: SECTION_IDS.whiteLabel, label: "Marca blanca" },
      { id: SECTION_IDS.studio, label: "Quiénes somos" },
      { id: SECTION_IDS.stack, label: "Stack" },
      { id: SECTION_IDS.services, label: "Software a medida" },
      { id: SECTION_IDS.contact, label: "Solicitar demo" },
    ],
    guides: "Guías",
    rights: "Todos los derechos reservados.",
  },
  en: {
    tagline: "Management systems under your brand, and custom software when you need it.",
    systemsTitle: "Systems",
    studioTitle: "Studio",
    links: [
      { id: SECTION_IDS.whiteLabel, label: "White label" },
      { id: SECTION_IDS.studio, label: "Who we are" },
      { id: SECTION_IDS.stack, label: "Stack" },
      { id: SECTION_IDS.services, label: "Custom software" },
      { id: SECTION_IDS.contact, label: "Request a demo" },
    ],
    guides: "Guides (Spanish)",
    rights: "All rights reserved.",
  },
};

// Each system link goes to the system's own page: real URLs crawlers can follow.
const LIVE_SYSTEMS = systems.filter((s) => s.stage === "live");

export default function Footer() {
  const c = useCopy(COPY);
  const year = new Date().getFullYear();
  const link =
    "inline-flex min-h-11 items-center text-[0.9375rem] text-mist transition-colors duration-150 ease-[ease] hover:text-parchment md:min-h-9";

  // Section links scroll in place on the home page; elsewhere they are plain links to
  // /#<id> (full navigation; see Navbar on why not next/link for cross-route hashes).
  const onHome = usePathname() === "/";
  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!onHome) return;
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="border-t border-line bg-night-deep">
      <div className="page grid gap-12 py-16 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/logo-mark.png" alt="" width={44} height={44} className="h-11 w-11" />
            <p className="text-xl font-semibold tracking-[-0.01em]">{SITE_CONFIG.name}</p>
          </div>
          <p className="mt-4 max-w-[36ch] text-mist">{c.tagline}</p>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="mt-4 inline-flex min-h-11 items-center font-semibold text-bronze-bright underline decoration-bronze/40 underline-offset-4 hover:decoration-bronze-bright"
          >
            {SITE_CONFIG.email}
          </a>
          <address className="mt-2 text-sm leading-relaxed text-mist not-italic">
            {SITE_CONFIG.address.street}
            <br />
            {SITE_CONFIG.address.city}, {SITE_CONFIG.address.region}, Venezuela
          </address>
        </div>

        <nav aria-labelledby="footer-systems">
          <h2 id="footer-systems" className="mb-3 text-sm font-semibold text-parchment">
            {c.systemsTitle}
          </h2>
          <ul>
            {LIVE_SYSTEMS.map((s) => (
              <li key={s.id}>
                <Link href={`/sistemas/${s.id}`} className={link}>
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-studio">
          <h2 id="footer-studio" className="mb-3 text-sm font-semibold text-parchment">
            {c.studioTitle}
          </h2>
          <ul>
            {c.links.map((item) => (
              <li key={item.id}>
                <a href={onHome ? `#${item.id}` : `/#${item.id}`} onClick={go(item.id)} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/guias" className={link}>
                {c.guides}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="page border-t border-line py-6">
        <p className="figures text-sm text-mist-dim">
          © {year} {SITE_CONFIG.name}. {c.rights}
        </p>
      </div>
    </footer>
  );
}
