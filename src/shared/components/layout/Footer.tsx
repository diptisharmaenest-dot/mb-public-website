import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import clsx from "clsx";
import { DownloadAppButton, RADIUS_BTN, Section } from "@/components";
import { mbLogoRed } from "@/assets";
import { ROUTES } from "@/shared/seo";
import { VERIFIED_TRUST_SECTION_PROPS } from "@/shared/data/verified-kitchen";

const companyLinks = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  // Hidden from nav (pages still reachable by URL) — uncomment to show again.
  // { label: "Kitchens", href: ROUTES.kitchens },
  // { label: "For Partners", href: ROUTES.partners },
  { label: "FAQ", href: ROUTES.faq },
] as const;

const infoLinks = [
  { label: "Terms & Conditions", href: ROUTES.terms },
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Contact Us", href: ROUTES.contact },
] as const;

const socialLinks = [
  { label: "Facebook", href: "#", Icon: FaFacebook },
  { label: "Instagram", href: "#", Icon: FaInstagram },
] as const;

function FooterTitle({
  title,
  accent = "verified",
}: {
  title: string;
  accent?: "verified" | "customer";
}) {
  return (
    <div className="mb-4">
      <h3 className="font-jakarta text-base font-bold text-white">{title}</h3>
      <span
        className={clsx(
          "mt-2 block h-0.5 w-8 rounded-full transition-all duration-300",
          accent === "verified" ? "bg-verified" : "bg-customer",
        )}
        aria-hidden
      />
    </div>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <FooterTitle title={title} />
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-sm text-footer-text/80 transition duration-200 hover:translate-x-0.5 hover:text-yellow"
            >
              <span>{link.label}</span>
              <FiArrowUpRight
                className="h-3.5 w-3.5 opacity-0 transition duration-200 group-hover:opacity-100"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      id="site-footer"
      className="bg-ink text-footer-text"
      {...VERIFIED_TRUST_SECTION_PROPS}
    >
      <Section
        fullWidth
        innerClassName="py-10 md:py-14"
      >
        {/* ── Top grid: Brand | Nav columns | App badges ── */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center md:gap-12 lg:gap-16">

          {/* Brand + social */}
          <div className="w-full md:w-[28%]">
            <Link
              href={ROUTES.home}
              aria-label="Mother Bhojan home"
              className="inline-block transition duration-200 hover:opacity-85"
            >
              <Image
                src={mbLogoRed}
                alt="Mother Bhojan"
                width={180}
                height={40}
                className="mb-5 h-8 w-auto sm:h-9"
              />
            </Link>
            <p className="max-w-[34ch] text-sm leading-relaxed text-footer-text/75">
              <span className="font-aguafina text-lg text-yellow" lang="hi">
                माँ के हाथ का खाना
              </span>
              {" — verified home kitchens and real home cooks, delivered warm across Mohali."}
            </p>
            {/* Social icons under tagline */}
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className={`group flex shrink-0 h-11 w-11 items-center justify-center border border-white/20 text-footer-text transition duration-200 hover:-translate-y-0.5 hover:border-customer hover:bg-customer hover:text-white hover:shadow-[0_8px_20px_rgba(225,87,76,0.3)] ${RADIUS_BTN}`}
                >
                  <Icon
                    className="h-[18px] w-[18px] transition duration-200 group-hover:scale-110"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns centered */}
          <div className="flex flex-1 flex-wrap gap-10 sm:gap-14 md:justify-between">
            <FooterColumn title="Company" links={companyLinks} />
            <FooterColumn title="Info" links={infoLinks} />
            {/* App waitlist — store links go live when apps ship */}
            <div className="flex flex-col gap-2.5 md:justify-start md:pt-1">
              <p className="max-w-[20ch] text-sm leading-relaxed text-footer-text/75">
                Mobile app coming soon.
              </p>
              <DownloadAppButton
                source="footer-waitlist"
                openLabel="Open the app"
                variant="none"
                className="inline-flex w-fit cursor-pointer items-center gap-1 text-sm font-semibold text-yellow transition duration-200 hover:text-white"
              >
                Join the waitlist
                <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </DownloadAppButton>
            </div>
          </div>



        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-4 py-6 text-sm text-footer-text/65 sm:flex-row sm:items-center sm:justify-between md:py-8">
          <p>Copyright © {year} Mother Bhojan.</p>
          <div className="flex flex-wrap gap-5">
            <Link
              href={ROUTES.privacy}
              className="transition duration-200 hover:text-yellow"
            >
              Privacy Policy
            </Link>
            <Link
              href={ROUTES.privacy}
              className="transition duration-200 hover:text-yellow"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
};

export default Footer;
