"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import VibeChordsLogo from "@/components/VibeChordsLogo";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
    { href: "/", label: "Chords" },
    { href: "/visualizer", label: "Theory" },
];

export default function TopNav() {
    const pathname = usePathname();
    // usePathname() — a Next.js hook that returns the current URL path.
    // We use it to highlight which tab is active.

    return (
        <header className="flex items-center justify-between border-b border-border px-4 py-2">
            <div className="flex items-center gap-6">
                <VibeChordsLogo className="text-xl" />

                <nav className="flex items-center gap-1">
                    {NAV_LINKS.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                                pathname === href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>

            <ThemeToggle />
        </header>
    );
}
