import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/shared/lib";
import { BUTTON_ICON_GAP, BUTTON_PX, BUTTON_PY, RADIUS_BTN } from './spacing'

/** Primary solid · Soft secondary · Tertiary text link · Link */
export type ButtonVariant =
  | "customer"
  | "customerSoft"
  | "customerOutline"
  | "partner"
  | "partnerSoft"
  | "partnerOutline"
  | "customerLink"
  | "none"
  | "verified";

type ButtonSize = "sm" | "md" | "lg";
type ButtonShape = "default" | "pill";

type SharedButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = SharedButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const shapeStyles: Record<ButtonShape, string> = {
  default: RADIUS_BTN,
  pill: RADIUS_BTN,
};

const baseStyles =
  `inline-flex cursor-pointer items-center justify-center ${BUTTON_ICON_GAP} font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-customer disabled:pointer-events-none disabled:opacity-50`;

const sizeStyles: Record<ButtonSize, string> = {
  sm: `min-h-11 ${BUTTON_PY} ${BUTTON_PX} [font-size:var(--text-caption)]`,
  md: `min-h-12 ${BUTTON_PY} ${BUTTON_PX} [font-size:var(--text-button)]`,
  lg: `min-h-[52px] ${BUTTON_PY} px-s8 [font-size:var(--text-button)]`,
};

/** Lift on hover — matches hero CTA motion. */
const sizeMotionStyles: Record<ButtonSize, string> = {
  sm: "transition-all duration-200 hover:-translate-y-px active:translate-y-0",
  md: "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
  lg: "transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
};

/**
 * Primary solid — gradient fill, top highlight, soft shadow.
 */
const solidVariantStyles: Record<"customer" | "partner" | "verified", string> = {
  customer:
    "border-t border-white/25 bg-gradient-to-b from-customer to-partner !text-white visited:!text-white shadow-[0_6px_16px_-4px_rgba(219,26,26,0.45)] hover:brightness-105 active:brightness-95",
  partner:
    "border-t border-white/25 bg-gradient-to-b from-partner to-partner-hover !text-white visited:!text-white shadow-[0_6px_16px_-4px_rgba(219,26,26,0.45)] hover:brightness-105 active:brightness-95",
  verified:
    "border-t border-white/25 bg-gradient-to-b from-verified to-verified-dark !text-white visited:!text-white shadow-[0_6px_16px_-4px_rgba(111,138,62,0.45)] hover:brightness-105 active:brightness-95",
};

/**
 * Soft secondary — cream fill, colored border + text (hero “Meet our cooks”).
 */
const softVariantStyles: Record<"customerSoft" | "partnerSoft", string> = {
  customerSoft:
    "border-2 border-customer bg-placeholder-bg !text-customer visited:!text-customer shadow-md hover:bg-surface",
  partnerSoft:
    "border-2 border-partner bg-placeholder-bg !text-partner visited:!text-partner shadow-md hover:bg-surface",
};

/**
 * Tertiary — text + arrow, no box (e.g. “See all kitchens →”).
 */
const tertiaryVariantStyles: Record<"customerOutline" | "partnerOutline", string> = {
  customerOutline:
    "inline-flex h-auto min-h-0 items-center gap-1.5 whitespace-nowrap rounded-none px-0 py-0 text-base font-bold !text-customer border-0 bg-transparent shadow-none hover:!text-customer-hover transition-all duration-200 visited:!text-customer",
  partnerOutline:
    "inline-flex h-auto min-h-0 items-center gap-1.5 whitespace-nowrap rounded-none px-0 py-0 text-base font-bold !text-partner border-0 bg-transparent shadow-none hover:!text-partner-hover transition-all duration-200 visited:!text-partner",
};

const variantStyles: Record<
  Exclude<
    ButtonVariant,
    | "customer"
    | "partner"
    | "verified"
    | "customerSoft"
    | "partnerSoft"
    | "customerOutline"
    | "partnerOutline"
  >,
  string
> = {
  customerLink:
    "inline-flex h-auto min-h-0 items-center gap-1.5 whitespace-nowrap rounded-none px-0 py-0 font-jakarta text-sm font-bold !text-customer underline-offset-4 transition-all duration-200 hover:gap-2.5 hover:!text-customer-hover hover:!underline visited:!text-customer",
  none: "",
};

const linkLikeVariants: ReadonlySet<ButtonVariant> = new Set([
  "customerLink",
  "customerOutline",
  "partnerOutline",
]);

const solidVariants: ReadonlySet<ButtonVariant> = new Set(["customer", "partner", "verified"]);
const softVariants: ReadonlySet<ButtonVariant> = new Set(["customerSoft", "partnerSoft"]);
const tertiaryVariants: ReadonlySet<ButtonVariant> = new Set([
  "customerOutline",
  "partnerOutline",
]);

function getVariantClasses(variant: ButtonVariant): string {
  if (solidVariants.has(variant)) {
    return solidVariantStyles[variant as "customer" | "partner" | "verified"];
  }
  if (softVariants.has(variant)) {
    return softVariantStyles[variant as "customerSoft" | "partnerSoft"];
  }
  if (tertiaryVariants.has(variant)) {
    return tertiaryVariantStyles[variant as "customerOutline" | "partnerOutline"];
  }
  return variantStyles[
    variant as Exclude<
      ButtonVariant,
      | "customer"
      | "partner"
      | "verified"
      | "customerSoft"
      | "partnerSoft"
      | "customerOutline"
      | "partnerOutline"
    >
  ];
}

function getButtonClasses({
  variant = "customer",
  size = "md",
  shape = "default",
  fullWidth,
  className,
}: Pick<SharedButtonProps, "variant" | "size" | "shape" | "fullWidth" | "className">) {
  const isLinkLike = linkLikeVariants.has(variant);
  const isBoxed =
    solidVariants.has(variant) || softVariants.has(variant);

  return cn(
    !isLinkLike && baseStyles,
    !isLinkLike && shapeStyles[shape],
    !isLinkLike && sizeStyles[size],
    isBoxed && sizeMotionStyles[size],
    getVariantClasses(variant),
    isLinkLike && "group",
    fullWidth && "w-full",
    className,
  );
}

function TertiaryArrow() {
  return (
    <svg
      className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.8"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

const Button = ({
  variant = "customer",
  size = "md",
  shape = "default",
  fullWidth = false,
  className,
  children,
  href,
  ...rest
}: ButtonProps) => {
  const classes = getButtonClasses({ variant, size, shape, fullWidth, className });
  const isTertiary = tertiaryVariants.has(variant);

  let renderedChildren = children;
  if (isTertiary && typeof children === "string") {
    renderedChildren = (
      <>
        <span className=" relative pb-[3px] border-b border-current/20 after:absolute after:bottom-[-1.5px] after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out after:origin-right group-hover:after:origin-left group-hover:after:scale-x-100">
          {children}
        </span>
        <TertiaryArrow />
      </>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">)}
      >
        {renderedChildren}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {renderedChildren}
    </button>
  );
};

export default Button;
