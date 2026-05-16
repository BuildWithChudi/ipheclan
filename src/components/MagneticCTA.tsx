"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { clsx } from "clsx";
import Magnetic from "@/components/Magnetic";

type CommonProps = {
  children: ReactNode;
  variant: "primary" | "ghost";
};

type AsLinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
  type?: never;
};

type AsButtonProps = CommonProps & {
  href?: never;
  external?: never;
  onClick?: () => void;
  type?: "button" | "submit";
};

type Props = AsLinkProps | AsButtonProps;

const styles = (variant: "primary" | "ghost") =>
  clsx(
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors",
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent/90"
      : "border border-fg/80 text-fg hover:border-fg"
  );

export default function MagneticCTA(props: Props) {
  const { children, variant } = props;

  if ("href" in props && props.href) {
    const isExternal =
      props.external ??
      (props.href.startsWith("http") ||
        props.href.startsWith("mailto:") ||
        props.href.startsWith("tel:"));

    if (isExternal) {
      return (
        <Magnetic radius={100} strength={0.35}>
          <a
            href={props.href}
            data-cursor="hover"
            target="_blank"
            rel="noopener noreferrer"
            className={styles(variant)}
          >
            {children}
          </a>
        </Magnetic>
      );
    }

    return (
      <Magnetic radius={100} strength={0.35}>
        <Link
          href={props.href}
          data-cursor="hover"
          className={styles(variant)}
        >
          {children}
        </Link>
      </Magnetic>
    );
  }

  return (
    <Magnetic radius={100} strength={0.35}>
      <button
        type={props.type ?? "button"}
        onClick={props.onClick}
        data-cursor="hover"
        className={styles(variant)}
      >
        {children}
      </button>
    </Magnetic>
  );
}
