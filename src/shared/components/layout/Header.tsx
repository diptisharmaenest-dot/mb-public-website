"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { DownloadAppButton, SECTION_PX, SectionContainer } from "@/components";
import { mbLogoRed } from "@/assets";
import { ROUTES } from "@/shared/seo";

const navLinks = [
  { label: "Home", path: ROUTES.home },
  // Hidden from nav (pages still reachable by URL) — uncomment to show again.
  // { label: "Home v2", path: ROUTES.homev2 },
  // { label: "Home v3", path: ROUTES.homev3 },
  { label: "About", path: ROUTES.about },
  // { label: "Kitchens", path: ROUTES.kitchens },
  // { label: "For Partners", path: ROUTES.partners },
  { label: "FAQ", path: ROUTES.faq },
];

function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function isNavActive(pathname: string, href: string) {
  const path = normalizePath(pathname);
  const link = normalizePath(href);
  if (link === "/") return path === "/";
  return path === link || path.startsWith(`${link}/`);
}

/** Dark cover/video heroes need white nav text. */
function isDarkHeroPath(pathname: string) {
  const path = normalizePath(pathname);
  // Home and Home v2 have light heroes (dark nav text); v3 keeps its dark video hero.
  if (path === ROUTES.homev3) {
    return true;
  }
  return path.startsWith(`${ROUTES.kitchens}/`);
}

type NavLinkProps = {
  href: string;
  label: string;
  isActive: boolean;
  onDark: boolean;
  onClick?: () => void;
};

function DesktopNavLink({ href, label, isActive, onDark, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "relative px-3.5 py-2 font-jakarta text-[15px] transition-colors duration-200",
        isActive
          ? "!font-bold !text-customer"
          : onDark
            ? "!font-medium !text-white hover:!text-white/85"
            : "!font-medium !text-ink/80 hover:!text-customer",
      )}
    >
      {label}
      {isActive ? (
        <span
          aria-hidden
          className="absolute bottom-0 left-3.5 right-3.5 h-[3px] rounded-full bg-customer"
        />
      ) : null}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  isActive,
  onClick,
}: Omit<NavLinkProps, "onDark">) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={clsx(
        "block px-1 py-2.5 font-jakarta text-sm",
        isActive ? "font-bold text-customer" : "font-medium text-ink/80",
      )}
    >
      {label}
    </Link>
  );
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const path = normalizePath(pathname);
  const onDark = isDarkHeroPath(path);

  return (
    <header className="absolute top-0 left-0 z-90 w-full bg-transparent">
      <SectionContainer noPaddingX className={SECTION_PX} fullWidth>
        <div className="flex items-center justify-between gap-4 py-3 md:py-4">
          <Link
            href={ROUTES.home}
            aria-label="Mother Bhojan home"
            className="shrink-0"
          >
            <Image
              src={mbLogoRed}
              alt="Mother Bhojan"
              priority
              className="h-12 w-auto object-contain drop-shadow-[0_2px_6px_rgba(219,26,26,0.18)] md:h-[60px]"
            />
          </Link>

          {/* Desktop glass nav */}
          <div
            className={clsx(
              "hidden items-center rounded-[12px] border py-2  pr-2 backdrop-blur-xl lg:flex",
              onDark
                ? "border-white/55 bg-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                : "border-white/80 bg-white/55 shadow-[0_8px_28px_rgba(42,31,24,0.1)]",
            )}
          >
            <nav className="flex items-center gap-1" aria-label="Primary">
              {navLinks.map((item) => (
                <DesktopNavLink
                  key={item.label}
                  href={item.path}
                  label={item.label}
                  onDark={onDark}
                  isActive={isNavActive(path, item.path)}
                />
              ))}
            </nav>
            <DownloadAppButton
              source="header"
              openLabel="Order now"
              variant="customer"
              size="sm"
              className="ml-3 !min-h-10 rounded-[12px] px-5 text-[13px] font-bold"
            >
              Order now
            </DownloadAppButton>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            className={clsx(
              "inline-flex cursor-pointer items-center justify-center rounded-[12px] border px-3 py-2 text-xl backdrop-blur-xl lg:hidden",
              onDark
                ? "border-white/55 bg-white/20 !text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                : "border-white/80 bg-white/55 !text-ink shadow-[0_8px_28px_rgba(42,31,24,0.1)]",
            )}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </SectionContainer>

      {open ? (
        <div className="absolute inset-x-0 top-full z-40 border-b border-ink/8 bg-white lg:hidden">
          <div className="space-y-2 px-6 py-5">
            {navLinks.map((item) => (
              <MobileNavLink
                key={item.label}
                href={item.path}
                label={item.label}
                isActive={isNavActive(path, item.path)}
                onClick={() => setOpen(false)}
              />
            ))}
            <DownloadAppButton
              source="header-mobile-menu"
              openLabel="Order now"
              variant="customer"
              size="sm"
              fullWidth
              className="mt-3"
              onClick={() => setOpen(false)}
            >
              Order now
            </DownloadAppButton>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
