import Link from "next/link";

type Props = {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
};

const styles = {
  primary: "bg-accent text-bg hover:opacity-90",
  secondary: "border border-border text-text hover:bg-surface",
  ghost: "text-accent hover:underline",
};

export default function ButtonLink({
  href,
  variant = "primary",
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-block rounded-lg px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}