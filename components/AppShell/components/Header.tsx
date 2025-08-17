import { getSocialLinks } from "@/app/api/essentials.route";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import ThemeSwitch from "./ThemeSwitch";

export default async function Header() {
  const { latest: data } = await getSocialLinks();

  return (
    <header className="header">
      <Avatar className="z-3 bg-card border-muted-foreground border-[1px] size-12">
        <AvatarImage alt="logo" src="/images/logo.webp" />
      </Avatar>
      <div className="space-x-3 flex">
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/">HOME</Link>/
          {data?.linkedin && (
            <Link target="_blank" href={data.linkedin}>
              RESUME
            </Link>
          )}
        </nav>
        <ThemeSwitch />
      </div>
    </header>
  );
}
