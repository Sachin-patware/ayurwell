import { Leaf } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <Leaf className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
      <span className="text-2xl font-bold tracking-tight text-foreground font-headline">
        AyurWell
      </span>
    </Link>
  );
}
